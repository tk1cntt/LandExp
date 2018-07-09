/* tslint:disable-next-line */
const Hashids = require('hashids');
const hashids = new Hashids('id.landexp.com.vn');
const hashpayments = new Hashids('payment.landexp.com.vn');

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
      return 'Đất thổ cử';
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

export const getPaymentStatus = type => {
  switch (type) {
    case 'FAILED':
      return 'Thanh toán thất bại';
    case 'SUCCESS':
      return 'Đã thanh toán';
    default:
      return 'Chờ thanh toán';
  }
};

export const getStatusType = type => {
  switch (type) {
    case 'FAILED':
      return 'Thanh toán thất bại';
    case 'APPROVED':
      return 'Đã thanh toán';
    case 'CANCELED':
      return 'Đã huỷ';
    case 'EXPIRED':
      return 'Đã hết hạn';
    case 'PAID':
      return 'Đã thanh toán';
    case 'SOLD':
      return 'Đã bán';
    default:
      return 'Chờ thanh toán';
  }
};

export const getMoney = (money, actionType) => {
  let moneyFormat = '<span>';
  if (money >= 1000000000) {
    moneyFormat += humanize(money / 1000000000);
    moneyFormat += '</span>';
    moneyFormat += ' tỷ';
  } else if (1000000 <= money && money < 1000000000) {
    moneyFormat += humanize(money / 1000000);
    moneyFormat += '</span>';
    moneyFormat += ' triệu';
  } else {
    moneyFormat += humanize(money / 1000);
    moneyFormat += '</span>';
    moneyFormat += ' ngàn';
  }
  if (actionType === 'FOR_RENT') {
    moneyFormat += '/tháng';
  }
  return moneyFormat;
};

export const selectPrice = (price) => {
  return priceFromValue(price);
};

function priceFromValue(price) {
  switch (price) {
    case 1:
      return {
        greaterThan: 0,
        lessThan: 500000001
      };
    case 2:
      return {
        greaterThan: 500000000,
        lessThan: 1000000001
      };
    case 3:
      return {
        greaterThan: 1000000000,
        lessThan: 1500000001
      };
    case 4:
      return {
        greaterThan: 1500000000,
        lessThan: 2000000001
      };
    case 5:
      return {
        greaterThan: 2000000000
      };
    default:
      return null;
  }
}

function humanize(x) {
  return x.toFixed(2).replace(/\.?0*$/, '');
}

export const encodeId = id => hashids.encode(id, 20190101);

export const decodeId = id => hashids.decode(id)[0];

export const encodePayment = id => hashpayments.encode(id, 20190101);

export const decodePayment = id => hashpayments.decode(id)[0];

export const formatDate = date => date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

export const queryStringMapping = parameters => {
  let queryString = '';
  for (var key in parameters) {
    queryString = queryString + key + '.equals=' + parameters[key] + '&';
  }
  return queryString.slice(0, -1);
};
