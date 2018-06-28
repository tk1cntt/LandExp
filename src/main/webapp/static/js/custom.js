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

$('.js-postdate li').click(function() {
  $('.js-postdate').css('display', 'none');
  $('#postdate span').text($(this).html());
  $('input#slPostdate').attr('value', $(this).attr('data-value'));
});

$('#close-menu').click(function() {
  $('.select.dropdown.mega-dropdown').removeClass('open');
  $('#filter-more').attr('aria-expanded', 'false');
  $('.dropdown-backdrop').remove();
});

$('#clear-menu').click(function() {
  $('#bathroom span').html('Bất kỳ');
  $('input#slBathroom').attr('value', '');
  $('#bedroom span').html('Bất kỳ');
  $('input#slBedroom').attr('value', '');
  $('#gara span').html('Bất kỳ');
  $('input#slGara').attr('value', '');
  $('#direction span').html('Bất kỳ');
  $('input#slDirection').attr('value', '');
  $('#postdate span').html('Bất kỳ');
  $('input#slPostdate').attr('value', '');
});

// Cac buoc dang tin
// Nut bam tiep theo/quya lai

$('.btn-prev').click(function() {
  if ($('#step-1 input').attr('value')) {
    $('.step-1').addClass('done');
  }

  if ($('#step-2 input').attr('value')) {
    $('.step-2').addClass('done');
    $('.summary .category').html($(this).text());
  }

  if ($('#step-3 input').val()) {
    $('.step-3').addClass('done');
  }

  if ($('#step-4 input').val()) {
    $('.step-4').addClass('done');
  }

  if ($('#step-5 input').val()) {
    $('.step-5').addClass('done');
  }

  if ($('#step-6 input').val()) {
    $('.step-6').addClass('done');
  }

  $('.process ul li').removeClass('active');
  $(
    '.process ul li.' +
      $(this)
        .parent()
        .parent()
        .prev()
        .attr('id')
  ).removeClass('done');
  $(
    '.process ul li.' +
      $(this)
        .parent()
        .parent()
        .prev()
        .attr('id')
  ).addClass('active');
  $(this)
    .parent()
    .parent()
    .removeClass('active');
  $(this)
    .parent()
    .parent()
    .prev()
    .addClass('active');
});

$('.btn-next').click(function() {
  if ($('#step-1 input').attr('value')) {
    $('.step-1').addClass('done');
  }

  if ($('#step-2 input').attr('value')) {
    $('.step-2').addClass('done');
    $('.summary .category').html($(this).text());
  }

  if ($('#step-3 input').val()) {
    $('.step-3').addClass('done');
  }

  if ($('#step-4 input').val()) {
    $('.step-4').addClass('done');
  }

  if ($('#step-5 input').val()) {
    $('.step-5').addClass('done');
  }

  if ($('#step-6 input').val()) {
    $('.step-6').addClass('done');
  }

  $('.process ul li').removeClass('active');
  $(
    '.process ul li.' +
      $(this)
        .parent()
        .parent()
        .next()
        .attr('id')
  ).removeClass('done');
  $(
    '.process ul li.' +
      $(this)
        .parent()
        .parent()
        .next()
        .attr('id')
  ).addClass('active');
  $(this)
    .parent()
    .parent()
    .removeClass('active');
  $(this)
    .parent()
    .parent()
    .next()
    .addClass('active');
});

// Nút chọn bước
$('.process ul li').click(function() {
  if ($('#step-1 input').attr('value')) {
    $('.step-1').addClass('done');
  }

  if ($('#step-2 input').attr('value')) {
    $('.step-2').addClass('done');
    $('.summary .category').html($(this).text());
  }

  if ($('#step-3 input').val()) {
    $('.step-3').addClass('done');
  }

  if ($('#step-4 input').val()) {
    $('.step-4').addClass('done');
  }

  if ($('#step-5 input').val()) {
    $('.step-5').addClass('done');
  }

  if ($('#step-6 input').val()) {
    $('.step-6').addClass('done');
  }

  $(this)
    .siblings()
    .removeClass('active');
  $(this).removeClass('done');
  $(this).removeClass('active');
  var className = $(this).attr('class');
  $(this).addClass('active');

  $('.step').removeClass('active');
  document.getElementById(className).className += ' active';
});

// Lua cho buoc 1-2

$('#step-1 .js-selector li').click(function() {
  $(this)
    .siblings()
    .removeClass();
  $(this).addClass('selected');
  $(this)
    .siblings('input')
    .attr('value', $(this).attr('data-value'));
  $('.form-summary span.type').html(
    $(this)
      .children('p')
      .text()
  );
});

$('#step-2 .js-selector li').click(function() {
  $(this)
    .siblings()
    .removeClass();
  $(this).addClass('selected');
  $(this)
    .siblings('input')
    .attr('value', $(this).attr('data-value'));
  $('.form-summary span.category').html(
    $(this)
      .children('p')
      .text()
  );
});

$('#step-3 #inputProvince').change(function() {
  $('#step-3 span.add-label').html(
    $('#step-3 #inputWard')
      .children('option:selected')
      .text() +
      ', ' +
      $('#step-3 #inputDistrict')
        .children('option:selected')
        .text() +
      ', ' +
      $('#step-3 #inputProvince')
        .children('option:selected')
        .text()
  );
});

$('#step-3 #inputDistrict').change(function() {
  $('#step-3 span.add-label').html(
    $('#step-3 #inputWard')
      .children('option:selected')
      .text() +
      ', ' +
      $('#step-3 #inputDistrict')
        .children('option:selected')
        .text() +
      ', ' +
      $('#step-3 #inputProvince')
        .children('option:selected')
        .text()
  );
});

$('#step-3 #inputWard').change(function() {
  $('#step-3 span.add-label').html(
    $('#step-3 #inputWard')
      .children('option:selected')
      .text() +
      ', ' +
      $('#step-3 #inputDistrict')
        .children('option:selected')
        .text() +
      ', ' +
      $('#step-3 #inputProvince')
        .children('option:selected')
        .text()
  );
});

$('#step-3 #inputAddress').change(function() {
  $('#step-3 span.add-label').html(
    $('#step-3 #inputWard')
      .children('option:selected')
      .text() +
      ', ' +
      $('#step-3 #inputDistrict')
        .children('option:selected')
        .text() +
      ', ' +
      $('#step-3 #inputProvince')
        .children('option:selected')
        .text()
  );
  $('.form-summary span.location').html(
    $('#step-3 #inputAddress').val() +
      ', ' +
      // $('#step-3 #inputWard').children('option:selected').text() + ', ' +
      $('#step-3 #inputDistrict')
        .children('option:selected')
        .text() +
      ', ' +
      $('#step-3 #inputProvince')
        .children('option:selected')
        .text()
  );
});

$('#step-4 .js-selector li').click(function() {
  $(this)
    .siblings()
    .removeClass();
  $(this).addClass('selected');
  $(this)
    .siblings('input')
    .attr('value', $(this).attr('data-value'));
  $(this)
    .siblings('input')
    .attr('data-text', $(this).text());
  $('.form-summary p.properties').html(
    '<br>' +
      $('#step-4 #inputBedroom').val() +
      ' phòng ngủ | ' +
      $('#step-4 #inputBathroom').val() +
      ' phòng tắm | ' +
      'D.tích: ' +
      $('#step-4 #dien-tich').val() +
      ' m2<br>' +
      'Hướng: ' +
      $('#step-4 #inputDirection').attr('data-text') +
      '| Tầng: ' +
      $('#step-4 #tang-thu').val()
  );
});

$('#step-5 #inputPrice').change(function() {
  $('.form-summary span.price').html($('#step-5 #inputPrice').val() + $('#step-5 #inputCurrency').val());
});

$('#step-5 #inputCurrency').change(function() {
  $('.form-summary span.price').html($('#step-5 #inputPrice').val() + $('#step-5 #inputCurrency').val());
});

$('#step-6 #inputFullname').change(function() {
  $('.form-summary span.contacts').html(
    $('#step-6 #inputFullname').val() + '<br>' + $('#step-6 #inputPhone').val() + '<br>' + $('#step-6 #inputEmail').val()
  );
});

$('#step-6 #inputPhone').change(function() {
  $('.form-summary span.contacts').html(
    $('#step-6 #inputFullname').val() + '<br>' + $('#step-6 #inputPhone').val() + '<br>' + $('#step-6 #inputEmail').val()
  );
});

$('#step-6 #inputEmail').change(function() {
  $('.form-summary span.contacts').html(
    $('#step-6 #inputFullname').val() + '<br>' + $('#step-6 #inputPhone').val() + '<br>' + $('#step-6 #inputEmail').val()
  );
});
