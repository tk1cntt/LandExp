	$('.like-button i')
	.mouseover(function() {
		$(this).removeClass( "fa-heart-o" ).addClass( "fa-heart" );
	})
	.mouseout(function() {
		$(this).removeClass( "fa-heart" ).addClass( "fa-heart-o" );
	});

	$(document).ready(function(){
		$('.dropdown-submenu div').on("click", function(e){
		    $(this).next('ul').toggle();
		   	e.stopPropagation();
		   	e.preventDefault();
		});
	});

function getLandType () {
             switch (type) {
               case 'APARTMENT':
                 return 'Căn hộ chung cư';
               case 'PEN_HOUSE':
                 return 'Penhouse';
               case 'HOME':
                 return 'Nhà riêng';
               case 'HOME_VILLA':
                 return 'Biệt thự';
               case 'HOME_STREET_SIDE':
                 return 'Nhà mặt phố';
               case 'MOTEL_ROOM':
                 return 'Phòng trọ';
               case 'OFFICE':
                 return 'Văn phòng';
               case 'LAND_SCAPE':
                 return 'Đất ở';
               case 'LAND_OF_PROJECT':
                 return 'Đất dự án';
               case 'LAND_FARM':
                 return 'Đất nông nghiệp';
               case 'LAND_RESORT':
                 return 'Resort';
               case 'WAREHOUSES':
                 return 'Kho, nhà xưởng';
               case 'KIOSKS':
                 return 'Cửa hàng, Ki ốt';
               default:
                 return 'Loại bất động sản khác';
             }
           };
