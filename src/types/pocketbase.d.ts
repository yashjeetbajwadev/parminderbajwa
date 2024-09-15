/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Blogs = "blogs",
	Clients = "clients",
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

export type ClientsRecord = {
	buying?: boolean
	email?: string
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
	agent?: string
	amenities?: string
	auctionDate?: IsoDateString
	bathroom?: number
	bedroom?: number
	city?: string
	images?: string[]
	listingDate?: IsoDateString
	lotSize?: number
	parking?: number
	price?: number
	priceByNegotiation?: boolean
	squareFt?: number
	state?: string
	status?: ListingsStatusOptions[]
	title?: string
	type?: ListingsTypeOptions[]
	yearBuilt?: IsoDateString
	zip?: number
}

export type PremissionsRecord = {
	isAdmin?: boolean
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
export type ClientsResponse<Texpand = unknown> = Required<ClientsRecord> & BaseSystemFields<Texpand>
export type ListingsResponse<Texpand = unknown> = Required<ListingsRecord> & BaseSystemFields<Texpand>
export type PremissionsResponse<Texpand = unknown> = Required<PremissionsRecord> & BaseSystemFields<Texpand>
export type TestimonialsResponse<Texpand = unknown> = Required<TestimonialsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	blogs: BlogsRecord
	clients: ClientsRecord
	listings: ListingsRecord
	premissions: PremissionsRecord
	testimonials: TestimonialsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	blogs: BlogsResponse
	clients: ClientsResponse
	listings: ListingsResponse
	premissions: PremissionsResponse
	testimonials: TestimonialsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'blogs'): RecordService<BlogsResponse>
	collection(idOrName: 'clients'): RecordService<ClientsResponse>
	collection(idOrName: 'listings'): RecordService<ListingsResponse>
	collection(idOrName: 'premissions'): RecordService<PremissionsResponse>
	collection(idOrName: 'testimonials'): RecordService<TestimonialsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
