// User related types
export interface IUser {
    _id: string;
    email: string;
    name: string;
    picture?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IUserWithToken extends IUser {
    token: string;
  }
  
  // Family related types
  export interface IFamily {
    _id: string;
    name: string;
    createdBy: string; // User ID
    admins: string[]; // User IDs
    members: string[]; // User IDs
    customFields: ICustomFieldConfig[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ICustomFieldConfig {
    fieldName: string;
    fieldType: 'text' | 'number' | 'date' | 'boolean' | 'select';
    required: boolean;
    options?: string[]; // For select type
  }
  
  // Family Member related types
  export interface IFamilyMember {
    _id: string;
    familyId: string;
    name: string;
    relationships: IRelationship[];
    customFields: Record<string, any>;
    photos: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IRelationship {
    type: RelationshipType;
    relatedTo: string; // FamilyMember ID
  }
  
  export enum RelationshipType {
    PARENT = 'parent',
    CHILD = 'child',
    SPOUSE = 'spouse',
    SIBLING = 'sibling',
    GRANDPARENT = 'grandparent',
    GRANDCHILD = 'grandchild',
    UNCLE_AUNT = 'uncle_aunt',
    NEPHEW_NIECE = 'nephew_niece',
    COUSIN = 'cousin'
  }
  
  // Authentication types - FIXED: Removed Express.Request dependency
  export interface IAuthRequest {
    user?: IUser;
  }
  
  // Response types
  export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
  }