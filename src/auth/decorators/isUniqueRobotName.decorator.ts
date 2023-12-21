import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueNameConstraints } from 'robot/validators/isuniquerobotname.validator';

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isUniqueEmail',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsUniqueNameConstraints,
    });
  };
}
