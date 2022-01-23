export interface IConfigurationCommonValidations {
  /**
   * Date: Validation that verifies the image/photo taken is between an range of time defined by Autoinspector.
   */
  date: IConfiguration;
  /**
   * Distance: Validation that verifies the distance between each photo taken is not more than certain threshold.
   */
  distance: IConfiguration;
  /**
   * Recaptured: Validation that verifies the image taken is not recaptured or fake.
   */
  recaptured: IConfiguration;
}

/**
 * Represents the object that indicates if some validation has to run and if its required for approve the image.
 */
export interface IConfiguration {
  /**
   * required: `Set the validation as required for approve the image. That means, if some validation has the required setted and it was not approved, the image will be disapproved.`
   */
  required: boolean;
  /**
   * required: `Set the validation to be considered at the moment of run the validations. You can have some validation not required but yes for run.`
   */
  run: boolean;
}
