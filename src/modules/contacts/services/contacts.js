/**
 * Service for load contacts with search/filtering.
 *
 * Created by desaroger on 22/11/16.
 */

export default function ContactsServicesContacts($interval, Contact) {
  'ngInject';

  let contactService = {

    // Sets if the search is enabled (if enabled, the searchTerm will be sent to the server
    search: false,

    // Search term of the search
    searchTerm: '',

    // Updated list of contacts
    list: [],

    // Object with the available filters (to filter tags) and the status. Ej: {maths: true} for filter only maths.
    filters: {},

    // The error (if given) of any method
    error: false,

    /**
     * Makes the call to the server, following the properties defined on the service.
     *
     * @return {Promise.<Array.<Contact>>} - The list of contacts updated.
     */
    update() {
      let params = {_sort: 'name', _embed: 'images'}; // Sorting by name, embed the images
      if (this.search && this.searchTerm) {           // Add search term
        params.q = this.searchTerm;
      }
      params.tags_like = Object.keys(this.filters)    // eslint-disable-line camelcase
        .filter((key) => !!this.filters[key]);        // Add filter for tags

      return Contact.getList(params)                  // Get list
        .then((list) => {
          this.list = list;
          if (!this.getActiveFilters().length && !this.search) {  // Init the filters
            this.initFilters();
          }
          this.error = false;
        })
        .catch((s) => {                               // Error catch
          if (s.status == -1) {
            this.error = 'Can\'t access the server. Automatic try every 5 seconds.';
          }
        });
    },

    /**
     * Toggles the search between enabled and disabled. Automatically updates the list.
     * Always removes the searchTerm.
     *
     * @param {boolean} [enabled] - The value of the desired search value. Defaults toggles.
     */
    toggleSearch(enabled = !this.search) {
      let prevEnabled = this.search;
      this.search = enabled;
      this.searchTerm = '';
      if (!enabled && prevEnabled) {
        this.update();
      }
    },

    /**
     * Finds on the list all used tags.
     */
    initFilters() {
      cleanObject(this.filters);
      this.list
        .forEach((contact) => {
          contact.tags
            .forEach((tag) => {
              this.filters[tag] = false;
            });
        });
      sortObjectKeys(this.filters);
    },

    /**
     * Gets the list of all the filters.
     *
     * @return {Array.<String>} - The list of filters.
     */
    getAvailableFilters() {
      return Object.keys(this.filters);
    },

    /**
     * Gets the list of the filters enabled.
     *
     * @return {Array.<String>} - The list of filters.
     */
    getActiveFilters() {
      return Object.keys(this.filters).filter((key) => !!this.filters[key]);
    }
  };

  /**
   * Interval function for reload in case of errors. Maybe not the most elegant way to do.
   */
  $interval(function intervalForContactsServiceError() {
    if (contactService.error) {
      contactService.update();
    }
  }, 5000);

  return contactService;

  /**
   * Cleans an object without breaking the reference.
   *
   * @param {Object} obj - The object to be cleaned
   */
  function cleanObject(obj) {
    for (let key in obj)
      if (obj.hasOwnProperty(key))
        delete obj[key];
  }

  /**
   * Sorts the properties of an object without breaking the reference
   * @param {Object} obj - The object to be sorted
   */
  function sortObjectKeys(obj) {
    let copy = angular.copy(obj);
    cleanObject(obj);
    Object.keys(copy)
      .sort()
      .forEach((key) => {
        obj[key] = copy[key];
      });
  }
};
