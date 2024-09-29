/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Blogs = "blogs",
	Contactme = "contactme",
	Listings = "listings",
	Premissions = "premissions",
	Testimonials = "testimonials",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BlogsRecord = {
	active?: boolean
	author?: string
	body?: HTMLString
	title?: string
	url?: string
}

export type ContactmeRecord = {
	buying?: boolean
	email?: string
	message?: string
	name?: string
	phone?: string
	selling?: boolean
}

export enum ListingsTypeOptions {
	"residential" = "residential",
	"commercial" = "commercial",
	"land" = "land",
}

export enum ListingsStatusOptions {
	"active" = "active",
	"sold" = "sold",
}
export type ListingsRecord = {
	additionalInfo?: string
	address?: string
	agent?: RecordIdString
	amenities?: string
	auctionDate?: IsoDateString
	bathroom?: number
	bedroom?: number
	city?: string
	featuredOnHomePage?: number
	floorSquareFt?: number
	images?: string[]
	landSquareFt?: number
	listingDate?: IsoDateString
	parking?: number
	price?: number
	priceByNegotiation?: boolean
	state?: string
	status?: ListingsStatusOptions
	title?: string
	type?: ListingsTypeOptions[]
	yearBuilt?: IsoDateString
	zip?: number
}

export type PremissionsRecord = {
	isAdmin?: boolean
	role?: string
}

export type TestimonialsRecord = {
	description?: string
	image?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
	premission: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type BlogsResponse<Texpand = unknown> = Required<BlogsRecord> & BaseSystemFields<Texpand>
export type ContactmeResponse<Texpand = unknown> = Required<ContactmeRecord> & BaseSystemFields<Texpand>
export type ListingsResponse<Texpand = unknown> = Required<ListingsRecord> & BaseSystemFields<Texpand>
export type PremissionsResponse<Texpand = unknown> = Required<PremissionsRecord> & BaseSystemFields<Texpand>
export type TestimonialsResponse<Texpand = unknown> = Required<TestimonialsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	blogs: BlogsRecord
	contactme: ContactmeRecord
	listings: ListingsRecord
	premissions: PremissionsRecord
	testimonials: TestimonialsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	blogs: BlogsResponse
	contactme: ContactmeResponse
	listings: ListingsResponse
	premissions: PremissionsResponse
	testimonials: TestimonialsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'blogs'): RecordService<BlogsResponse>
	collection(idOrName: 'contactme'): RecordService<ContactmeResponse>
	collection(idOrName: 'listings'): RecordService<ListingsResponse>
	collection(idOrName: 'premissions'): RecordService<PremissionsResponse>
	collection(idOrName: 'testimonials'): RecordService<TestimonialsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
