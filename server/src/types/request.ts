export type RequestBody = {
	name: string
	creationDate: Date
	description: string
	imageUrl: string
	user: string
	tags: { _id: string; name: string; color: string }[]
	customFields: any[]
	collection: string
}
