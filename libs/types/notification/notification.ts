import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum'
import { Member } from '../member/member'
import { TotalCounter } from '../product/product'

export interface MeNotified {
	authorId: string
	notificationRefId: string
	myNotification: boolean
}

export interface NotificDto {
	_id: string
	notificationType?: NotificationType
	notificationStatus?: NotificationStatus
	notificationGroup?: NotificationGroup
	notificationTitle: string
	notificationDesc?: string
	authorId: string
	receiverId: string
	productId?: string
	articleId?: string
	memberData?: Member
}

export interface Notifications {
	list: NotificDto[]
	metaCounter: TotalCounter[]
}
