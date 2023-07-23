export enum Api {
  AUTH_CHECK_TOKEN = "/user/check_token",

  USER_SIGNUP = "/user/signup",
  USER_FORGOT_PASSWORD = "/user/forgot_password",
  USER_LOGIN = "/user/login",
  USER_CHANGE_PASSWORD = "/user/change_password",
  USER_GET_ALL = "/user/get_all_users",
  USER_UPDATE = "/user/update",

  ORDER_GENERATE_ORDER_BILL = "/order/generate_order_bill",
  ORDER_GET_PDF = "/order/get_pdf",
  ORDER_GET = "/order/get_orders",
  ORDER_DELETE_BY_ID = "/order/delete_by_id/",

  CATEGORY_ADD = "/category/add",
  CATEGORY_UPDATE = "/category/update",
  CATEGORY_GET = "/category/get",
  CATEGORY_GET_FILTER = "/category/get?filterValue=true",

  STATISTICS_DETAILS = "/statistics/details",

  PRODUCT_ADD = "/product/add",
  PRODUCT_UPDATE = "/product/update",
  PRODUCT_GET = "/product/get",
  PRODUCT_UPDATE_STATUS = "/product/update_status",
  PRODUCT_DELETE = "/product/delete/",
  PRODUCT_GET_BY_CATEGORY = "/product/get_by_category/",
  PRODUCT_GET_BY_ID = "/product/get_by_id/",
}
