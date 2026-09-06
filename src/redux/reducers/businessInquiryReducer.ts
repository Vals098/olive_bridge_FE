import type { UnknownAction } from "redux"
import type { BusinessInquiry } from "../../types/BusinessInquiry"
import {
  CREATE_BUSINESS_INQUIRY,
  type CreateBusinessInquiryAction,
} from "../actions/businessInquiryAction/createBusinessInquiry"
import {
  GET_BUSINESS_INQUIRIES,
  type GetBusinessInquiriesAction,
} from "../actions/businessInquiryAction/getBusinessInquiries"

interface BusinessInquiryState {
  businessInquiries: BusinessInquiry[]
}

const initialState: BusinessInquiryState = {
  businessInquiries: [],
}

type BusinessInquiryAction =
  | CreateBusinessInquiryAction
  | GetBusinessInquiriesAction

const businessInquiryReducer = (
  state = initialState,
  action: BusinessInquiryAction | UnknownAction,
): BusinessInquiryState => {
  switch (action.type) {
    case GET_BUSINESS_INQUIRIES:
      return {
        ...state,
        businessInquiries: (action as GetBusinessInquiriesAction).payload,
      }

    case CREATE_BUSINESS_INQUIRY:
      return {
        ...state,
        businessInquiries: [
          ...state.businessInquiries,
          (action as CreateBusinessInquiryAction).payload,
        ],
      }

    default:
      return state
  }
}

export default businessInquiryReducer
