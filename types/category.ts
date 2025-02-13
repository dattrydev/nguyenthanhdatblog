export interface Category {
	name: string;
	slug: string;
}

export type CategoryList = Category & {
	postCount: number;
};
