/**
 * Created by desaroger on 22/11/16.
 */

export default function ContactsServicesContacts($interval, Contact) {
  let contactService = {
    search: false,
    searchTerm: '',
    list: [],
    filters: {},
    error: false,
    update() {
      let params = {_sort: 'name', _embed: 'images'};
      if (this.search && this.searchTerm) {
        params.q = this.searchTerm;
      }
      params.tags_like = Object.keys(this.filters)  // eslint-disable-line camelcase
        .filter((key) => !!this.filters[key]);
      return Contact.getList(params)
        .then((list) => {
          this.list = list;
          if (!this.getActiveFilters().length && !this.search) {
            this.initFilters();
          }
          this.error = false;
        })
        .catch((s) => {
          if (s.status == -1) {
            this.error = 'Can\'t access the server. Automatic try every 5 seconds.';
          }
        });
    },
    toggleSearch(enabled = !this.search) {
      let prevEnabled = this.search;
      this.search = enabled;
      this.searchTerm = '';
      if (!enabled && prevEnabled) {
        this.update();
      }
    },
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
    getAvailableFilters() {
      return Object.keys(this.filters);
    },
    getActiveFilters() {
      return Object.keys(this.filters).filter(key => !!this.filters[key]);
    }
  };

  $interval(function intervalForContactsServiceError() {
    if (contactService.error) {
      contactService.update();
    }
  }, 5000);

  return contactService;

  function cleanObject(obj) {
    for (let key in obj)
      if (obj.hasOwnProperty(key))
        delete obj[key];
  }

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
