$('.like-button i')
  .mouseover(function() {
    $(this)
      .removeClass('fa-heart-o')
      .addClass('fa-heart');
  })
  .mouseout(function() {
    $(this)
      .removeClass('fa-heart')
      .addClass('fa-heart-o');
  });

$(document).ready(function() {
  $('.dropdown-submenu div').on('click', function(e) {
    $(this)
      .next('ul')
      .toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});

$('.dropdown-menu.has-sub').on('click', function(event) {
  event.stopPropagation();
});

$('.datepicker').datepicker({
  format: 'dd/mm/yyyy',
  autoclose: true
});

//

$('.select li').click(function() {
  $(this)
    .siblings()
    .removeClass('active');
  $(this).addClass('active');
});

$('.select .js-type li').click(function() {
  $('.select span#type').text($(this).html());
  $('.select input#slType').attr('value', $(this).attr('data-value'));
});

$('.select .js-category li').click(function() {
  $('.select span#category').text($(this).html());
  $('.select input#slCategory').attr('value', $(this).attr('data-value'));
});

$('.select .js-price li').click(function() {
  $('.select span#price').text($(this).text());
  $('.select input#slPrice').attr('value', $(this).attr('data-value'));
});
$('.select .js-square li').click(function() {
  $('.select span#square').text($(this).text());
  $('.select input#slSqrare').attr('value', $(this).attr('data-value'));
});

$('.js-bathroom li').click(function() {
  $('.js-bathroom').css('display', 'none');
  $('#bathroom span').text($(this).html());
  $('input#slBathroom').attr('value', $(this).attr('data-value'));
});

$('.select .js-bathroom li').click(function() {
  $('.select span#bathroom').text($(this).text());
  $('.select input#slBathroom').attr('value', $(this).attr('data-value'));
});

$('.js-bedroom li').click(function() {
  $('.js-bedroom').css('display', 'none');
  $('#bedroom span').text($(this).html());
  $('input#slBedroom').attr('value', $(this).attr('data-value'));
});

$('.select .js-bedroom li').click(function() {
  $('.select span#bedroom').text($(this).text());
  $('.select input#slBedroom').attr('value', $(this).attr('data-value'));
});

$('.js-gara li').click(function() {
  $('.js-gara').css('display', 'none');
  $('#gara span').text($(this).html());
  $('input#slGara').attr('value', $(this).attr('data-value'));
});

$('.js-direction li').click(function() {
  $('.js-direction').css('display', 'none');
  $('#direction span').text($(this).html());
  $('input#slDirection').attr('value', $(this).attr('data-value'));
});

$('#close-menu').click(function() {
  $('.select.dropdown.mega-dropdown').removeClass('open');
  $('#filter-more').attr('aria-expanded', 'false');
  $('.dropdown-backdrop').remove();
});

$('#clear-menu').click(function() {});
