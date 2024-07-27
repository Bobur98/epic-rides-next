import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
	mutation UpdateMemberByAdmin($input: MemberUpdateDto!) {
		UpdateMemberByAdmin(input: $input) {
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
`;

/**************************
 *        PRODUCT        *
 *************************/

export const UPDATE_PRODUCT_BY_ADMIN = gql`
	mutation UpdateProductByAdmin($input: ProductUpdateDto!) {
		updateProductByAdmin(input: $input) {
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
		}
	}
`

export const REMOVE_PRODUCT_BY_ADMIN = gql`
	mutation RemoveProductByAdmin($input: String!) {
		removeProductByAdmin(productId: $input) {
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
		}
	}
`

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdateDto!) {
		updateBoardArticleByAdmin(input: $input) {
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
		}
	}
`

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
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

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`

/**************************
 *         FAQ        *
 *************************/
export const CREATE_FAQ_BY_ADMIN = gql`
	mutation CreateFaq($input: FaqInputDto!) {
		createFaq(input: $input) {
			_id
			faqQuestion
			faqAnswer
			faqType
			createdAt
			updatedAt
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
		}
	}
`
export const UPDATE_FAQ_BY_ADMIN = gql`
	mutation UpdateFaq($input: FaqUpdateDto!) {
		updateFaq(input: $input) {
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
		}
	}
`
export const DELETE_FAQ_BY_ADMIN = gql`
	mutation DeleteFaq($input: String!) {
		deleteFaq(input: $input) {
			_id
			faqQuestion
			faqStatus
			faqAnswer
			faqType
		}
	}
`

/**************************
 *         NOTICE        *
 *************************/
export const CREATE_NOTICE_BY_ADMIN = gql`
	mutation CreateNotice($input: NoticeInputDto!) {
		createNotice(input: $input) {
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
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
			}
		}
	}
`
export const UPDATE_NOTICE_BY_ADMIN = gql`
	mutation UpdateNotice($input: NoticeUpdateDto!) {
		updateNotice(input: $input) {
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
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
			}
		}
	}
`
export const DELETE_NOTICE_BY_ADMIN = gql`
	mutation DeleteNotice($input: String!) {
		deleteNotice(input: $input) {
			_id
			noticeType
			noticeContent
			noticeStatus
			createdAt
			updatedAt
		}
	}
`
