import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomFieldConfig {
  fieldName: string;
  fieldType: 'text' | 'number' | 'date' | 'boolean' | 'select';
  required: boolean;
  options?: string[];
}

export interface IFamilyDocument extends Document {
  name: string;
  createdBy: mongoose.Types.ObjectId;
  admins: mongoose.Types.ObjectId[];
  members: mongoose.Types.ObjectId[];
  customFields: ICustomFieldConfig[];
  createdAt: Date;
  updatedAt: Date;
}

const customFieldConfigSchema = new Schema<ICustomFieldConfig>({
  fieldName: {
    type: String,
    required: true,
    trim: true
  },
  fieldType: {
    type: String,
    enum: ['text', 'number', 'date', 'boolean', 'select'],
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  options: [String]
});

const familySchema = new Schema<IFamilyDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    admins: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    customFields: [customFieldConfigSchema]
  },
  {
    timestamps: true
  }
);

const Family = mongoose.model<IFamilyDocument>('Family', familySchema);
export default Family;