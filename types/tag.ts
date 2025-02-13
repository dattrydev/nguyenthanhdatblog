export interface Tag {
	name: string;
	slug: string;
}

export type TagList = Tag & {
	postCount: number;
};
