import mongoose, { Document, Schema } from 'mongoose';

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

export interface IRelationship {
  type: RelationshipType;
  relatedTo: mongoose.Types.ObjectId;
}

export interface IFamilyMemberDocument extends Document {
  familyId: mongoose.Types.ObjectId;
  name: string;
  relationships: IRelationship[];
  customFields: Map<string, any>;
  photos: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const relationshipSchema = new Schema<IRelationship>({
  type: {
    type: String,
    enum: Object.values(RelationshipType),
    required: true
  },
  relatedTo: {
    type: Schema.Types.ObjectId,
    ref: 'FamilyMember',
    required: true
  }
});

const familyMemberSchema = new Schema<IFamilyMemberDocument>(
  {
    familyId: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    relationships: [relationshipSchema],
    customFields: {
      type: Map,
      of: Schema.Types.Mixed,
      default: new Map()
    },
    photos: [{
      type: String
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

familyMemberSchema.index({ familyId: 1, name: 1 });

const FamilyMember = mongoose.model<IFamilyMemberDocument>('FamilyMember', familyMemberSchema);
export default FamilyMember;