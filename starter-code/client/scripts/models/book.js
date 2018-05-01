'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'insert cloud API server URL here';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  Book.fetchAll = function(callback){
    console.log('in fetchAll');
    let data = $('#location_name').val();
    console.log(data);
    data = "Yellowstone"
    return $.get(`${ENV.apiUrl}/api/v1/map_call/${data}`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
    }
  console.log(Book)
  module.Book = Book;
})(app)
