import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
	query GetAllMembersByAdmin($input: MembersInquiryDto!) {
		getAllMembersByAdmin(input: $input) {
			list {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberProducts
				memberArticles
				memberFollowings
				memberPoints
				memberLikes
				memberViews
				memberComments
				memberRank
				memberWarnings
				memberBlocks
				createdAt
				updatedAt
				deletedAt
				accessToken
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *        PRODUCT        *
 *************************/

export const GET_ALL_PRODUCTS_BY_ADMIN = gql`
	query GetAllProductsByAdmin($input: AllProductsInquiryDto!) {
		getAllProductsByAdmin(input: $input) {
			list {
				_id
				productBrand
				productModel
				productYear
				productType
				productEngine
				productEngineCc
				productPower
				productTorque
				productWeight
				productPrice
				productCondition
				productRent
				productBarter
				productViews
				productLikes
				productRank
				productStatus
				productImages
				productDesc
				productComments
				productLocation
				memberId
				soldAt
				deletedAt
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProducts
					memberArticles
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					createdAt
					updatedAt
					deletedAt
					accessToken
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
			}
			metaCounter {
				total
			}
		}
	}
`

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_ALL_BOARD_ARTICLES_BY_ADMIN = gql`
	query GetAllBoardArticlesByAdmin($input: AllBoardArticlesInquiryDto!) {
		getAllBoardArticlesByAdmin(input: $input) {
			list {
				_id
				articleCategory
				articleStatus
				articleTitle
				articleContent
				articleImage
				articleViews
				articleLikes
				articleComments
				memberId
				createdAt
				updatedAt
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProducts
					memberArticles
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					createdAt
					updatedAt
					deletedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS_BY_ADMIN = gql`
	query GetComments($input: CommentsInquiryDto!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProducts
					memberArticles
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					createdAt
					updatedAt
					deletedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`

/**************************
 *         FAQ        *
 *************************/
export const GET_FAQS_BY_ADMIN = gql`
	query GetFaqs($input: FaqInquiryDto!) {
		getFaqs(input: $input) {
			list {
				_id
				faqQuestion
				faqAnswer
				faqType
				createdAt
				updatedAt
				faqStatus
			}
			metaCounter {
				total
			}
		}
	}
`
export const GET_FAQ_BY_ADMIN = gql`
	query GetFaq($input: String!) {
		getFaq(input: $input) {
			_id
			faqQuestion
			faqAnswer
			faqType
			faqStatus
			memberData {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberProducts
				memberArticles
				memberFollowings
				memberPoints
				memberLikes
				memberViews
				memberComments
				memberRank
				memberWarnings
				memberBlocks
				createdAt
				updatedAt
				deletedAt
				accessToken
			}
			createdAt
			updatedAt
		}
	}
`

/**************************
 *         NOTICE        *
 *************************/
export const GET_NOTICE_BY_ADMIN = gql`
	query GetNotice($input: String!) {
		getNotice(input: $input) {
			_id
			noticeType
			noticeContent
			noticeStatus
			createdAt
			updatedAt
			memberData {
				_id
				memberType
				memberStatus
				memberAuthType
				memberPhone
				memberNick
				memberFullName
				memberImage
				memberAddress
				memberDesc
				memberProducts
				memberArticles
				memberFollowings
				memberPoints
				memberLikes
				memberViews
				memberComments
				memberRank
				memberWarnings
				memberBlocks
				createdAt
				updatedAt
				deletedAt
				accessToken
			}
		}
	}
`
export const GET_NOTICES_BY_ADMIN = gql`
	query GetNotices($input: NoticeInquiryDto!) {
		getNotices(input: $input) {
			list {
				_id
				noticeType
				noticeContent
				noticeStatus
				createdAt
				updatedAt
				memberData {
					_id
					memberType
					memberStatus
					memberAuthType
					memberPhone
					memberNick
					memberFullName
					memberImage
					memberAddress
					memberDesc
					memberProducts
					memberArticles
					memberFollowings
					memberPoints
					memberLikes
					memberViews
					memberComments
					memberRank
					memberWarnings
					memberBlocks
					createdAt
					updatedAt
					deletedAt
					accessToken
				}
			}
			metaCounter {
				total
			}
		}
	}
`