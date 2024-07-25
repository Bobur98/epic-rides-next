import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_AGENTS = gql`
	query GetAgents($input: AgentsInquiryDto!) {
		getAgents(input: $input) {
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
			metaCounter {
				total
			}
		}
	}
`;

export const GET_MEMBER = gql(`  
	query GetMember($input: String!) {
    getMember(memberId: $input) {
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
`);

/**************************
 *        PRODUCT        *
 *************************/

export const GET_PRODUCT = gql`
	query GetProduct($input: String!) {
		getProduct(productId: $input) {
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
	}
`

export const GET_PRODUCTS = gql`
	query GetProducts($input: ProductsInquiryDto!) {
		getProducts(input: $input) {
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

export const GET_AGENT_PRODUCTS = gql`
	query GetAgentProducts($input: AgentProductsInquiryDto!) {
		getAgentProducts(input: $input) {
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
			}
			metaCounter {
				total
			}
		}
	}
`

export const GET_FAVORITES = gql`
	query GetFavorites($input: OrdinaryInquiryDto!) {
		getFavorites(input: $input) {
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
			metaCounter {
				total
			}
		}
	}
`

export const GET_VISITED = gql`
	query GetVisited($input: OrdinaryInquiryDto!) {
		getVisited(input: $input) {
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
			metaCounter {
				total
			}
		}
	}
`

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
	query GetBoardArticle($input: String!) {
		getBoardArticle(articleId: $input) {
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
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`

export const GET_BOARD_ARTICLES = gql`
	query GetBoardArticles($input: BoardArticlesInquiryDto!) {
		getBoardArticles(input: $input) {
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
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
	query GetMemberFollowers($input: FollowInquiryDto!) {
		getMemberFollowers(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				followerData {
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
				}
				meFollowed {
					followingId
					followerId
					myFollowing
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

export const GET_MEMBER_FOLLOWINGS = gql`
	query GetMemberFollowings($input: FollowInquiryDto!) {
		getMemberFollowings(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				followingData {
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
				meFollowed {
					followingId
					followerId
					myFollowing
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
export const GET_FAQ = gql`
	query GetFaq($input: String!) {
		getFaq(input: $input) {
			_id
			faqQuestion
			faqAnswer
			faqType
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
			createdAt
			updatedAt
		}
	}
`
export const GET_FAQS = gql`
	query GetFaqs($input: FaqInquiryDto!) {
		getFaqs(input: $input) {
			list {
				_id
				faqQuestion
				faqAnswer
				faqType
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
			metaCounter {
				total
			}
		}
	}
`

/**************************
 *         NOTICE        *
 *************************/
export const GET_NOTICE = gql`
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
export const GET_NOTICES = gql`
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