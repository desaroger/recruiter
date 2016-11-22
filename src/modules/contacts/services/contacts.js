/**
 * Created by desaroger on 22/11/16.
 */

export default function ContactsServicesContacts(Contact) {
  let contactService = {
    search: false,
    searchTerm: '',
    list: [],
    update() {
      let params = {_sort: 'name', _embed: 'images'};
      if (this.search && this.searchTerm) {
        params.q = this.searchTerm;
      }
      return Contact.getList(params)
        .then((list) => {
          this.list = list;
        });
    },
    toggleSearch(enabled = !this.search) {
      let prevEnabled = this.search;
      this.search = enabled;
      this.searchTerm = '';
      if (!enabled && prevEnabled) {
        this.update();
      }
    }
  };

  return contactService;
};
