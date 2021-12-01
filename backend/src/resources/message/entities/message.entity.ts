import * as mongoose from 'mongoose';
export class MessageEntity {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  text: string;
  read: boolean;
  fromRole: string;
  toRole: string;
  constructor(
    from: mongoose.Types.ObjectId,
    to: mongoose.Types.ObjectId,
    text: string,
    read: boolean,
    fromRole: string,
    toRole: string,
  ) {
    this.from = from;
    this.to = to;
    this.text = text;
    this.read = read;
    this.fromRole = fromRole;
    this.toRole = toRole;
  }
}
