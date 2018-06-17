export const getActionType = type => {
  if (type === 'FOR_SELL') {
    return 'Bán bất động sản';
  } else {
    return 'Cho thuê bất động sản';
  }
};

export const getLandType = type => {
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

export const getCityType = value => {
  let address = '';
  if (value.cities) {
    value.cities.map(city => {
      if (city.id === value.cityId) {
        city.districts.map(district => {
          if (district.id === value.districtId) {
            district.wards.map(ward => {
                if (ward.id === value.wardId) {
                  address += ward.name + ' - ';
                }
            });
            address += district.name + ' - ';
          }
        });
        address += city.name;
      }
    });
  }
  return address;
};

export const getDirection = type => {
  switch (type) {
    case 'NORTH':
      return 'Bắc';
    case 'SOUTH':
      return 'Nam';
    case 'EAST':
      return 'Đông';
    case 'WEST':
      return 'Tây';
    case 'EAST_NORTH':
      return 'Đông Bắc';
    case 'WEST_NORTH':
      return 'Tây Bắc';
    case 'EAST_SOUTH':
      return 'Đông Nam';
    // case 'WEST_SOUTH':
    default:
      return 'Tây Nam';
  }
};

export const getPresent = type => {
  switch (type) {
    case 'NONE':
      return 'Không hỗ trợ';
    case 'BASIC_FURNITURE':
      return 'Hỗ trợ nội thất cơ bản';
    case 'FULL_FURNITURE':
      return 'Hỗ trợ nội thất đầy đủ';
    case 'DISCOUNT_PRICE':
      return 'Hỗ trợ chiết khấu giảm giá';
    case 'SUPPORT_EXHIBIT':
      return 'Hỗ trợ thủ tục giấy tờ';
    case 'SUPPORT_FEE':
      return 'Hỗ trợ phí giao dịch';
    // case 'HAVE_PRESENT':
    default:
      return 'Có quà tặng';
  }
};

export const getSaleType = type => {
  switch (type) {
    case 'SALE_BY_MYSELF_VIP':
      return 'Tin VIP';
    case 'SALE_SUPPORT':
      return 'Ký gửi thường';
    case 'SALE_SUPPORT_VIP':
      return 'Ký gửi VIP';
    default:
      return 'Tin thường';
  }
};
