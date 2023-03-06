<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        @submit="saveChanges1()"
        :validation-schema="profileDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Avatar</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                style="background-image: url(/media/avatars/blank.png)"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${profileDetails.avatar})`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field
                    type="text"
                    name="first_name"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                    v-model="profileDetails.first_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="first_name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field
                    type="text"
                    name="middle_name"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Middle name"
                    v-model="profileDetails.middle_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="middle_name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field
                    type="text"
                    name="last_name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                    v-model="profileDetails.last_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="last_name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Contact Phone</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="mobile"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
                v-model="profileDetails.mobile"
                disabled
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="mobile" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Email</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="email"
                name="email"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
                v-model="profileDetails.email"
                disabled
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Country</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Country of origination"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="country"
                class="form-select form-select-solid form-select-lg fw-semobold"
                v-model="profileDetails.country"
              >
                <option
                  :value="item['alpha-3']"
                  v-for="(item, index) in ISOCountries"
                  :key="index"
                >
                  {{ item.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="country" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Language</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <!--begin::Input-->
              <Field
                as="select"
                name="language"
                class="form-select form-select-solid form-select-lg"
                v-model="profileDetails.language"
              >
                <option
                  :value="name"
                  v-for="(item, name) in ISOLanguage"
                  :key="name"
                >
                  {{ truncate(item.native[0], 20) }} -
                  {{ truncate(item.english[0], 20) }} ({{ name }})
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="language" />
                </div>
              </div>
              <!--end::Input-->

              <!--begin::Hint-->
              <div class="form-text">
                Please select a preferred language, including date, time, and
                number formatting.
              </div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Time Zone</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="timezone"
                class="form-select form-select-solid form-select-lg"
                v-model="profileDetails.timezone"
              >
                <option
                  v-for="(item, index) in Timezones"
                  :key="index"
                  :value="item.utc[0]"
                >
                  {{ item.text }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="timezone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Currency</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="currency"
                class="form-select form-select-solid form-select-lg"
                v-model="profileDetails.currency"
              >
                <option
                  :value="name"
                  v-for="(item, name) in ISOCurrencies"
                  :key="name"
                >
                  {{ truncate(item.demonym, 20) }} -
                  {{ truncate(item.name, 20) }} ({{ name }})
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="currency" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Sign-in Method</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Email Address</div>
            <div class="fs-6 fw-semobold text-gray-600">
              support@keenthemes.com
            </div>
          </div>

          <div
            id="kt_signin_email_edit"
            :class="{ 'd-none': !emailFormDisplay }"
            class="flex-row-fluid"
          >
            <!--begin::Form-->
            <VForm
              id="kt_signin_change_email"
              class="form"
              novalidate
              @submit="updateEmail()"
              :validation-schema="changeEmail"
            >
              <div class="row mb-6">
                <div class="col-lg-6 mb-4 mb-lg-0">
                  <div class="fv-row mb-0">
                    <label
                      for="emailaddress"
                      class="form-label fs-6 fw-bold mb-3"
                      >Enter New Email Address</label
                    >
                    <Field
                      type="email"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      id="emailaddress"
                      placeholder="Email Address"
                      name="emailaddress"
                      value="support@keenthemes.com"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="emailaddress" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmemailpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmemailpassword"
                      id="confirmemailpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmemailpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_signin_submit"
                  type="submit"
                  ref="updateEmailButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Update Email </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_signin_cancel"
                  type="button"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                  @click="emailFormDisplay = !emailFormDisplay"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_email_button"
            :class="{ 'd-none': emailFormDisplay }"
            class="ms-auto"
          >
            <button
              class="btn btn-light fw-bolder px-6"
              @click="emailFormDisplay = !emailFormDisplay"
            >
              Change Email
            </button>
          </div>
        </div>
        <!--end::Email Address-->

        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">Password</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              Password must be at least 8 character and contain symbols
            </div>

            <!--begin::Form-->
            <VForm
              id="kt_signin_change_password"
              class="form"
              novalidate
              @submit="updatePassword()"
              :validation-schema="changePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="currentpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Current Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="currentpassword"
                      id="currentpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="currentpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="newpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="newpassword"
                      id="newpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="newpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmpassword"
                      id="confirmpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Update Password </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              @click="passwordFormDisplay = !passwordFormDisplay"
              class="btn btn-light fw-bolder"
            >
              Reset Password
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->

  <!--begin::Connected Accounts-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_connected_accounts"
      aria-expanded="true"
      aria-controls="kt_account_connected_accounts"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Connected Accounts</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_connected_accounts" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <div
          class="notice d-flex bg-light-primary rounded border-primary border border-dashed mb-9 p-6"
        >
          <span class="svg-icon svg-icon-2tx svg-icon-primary me-4">
            <inline-svg src="/media/icons/duotune/art/art006.svg" />
          </span>

          <!--begin::Wrapper-->
          <div class="d-flex flex-stack flex-grow-1">
            <!--begin::Content-->
            <div class="fw-semobold">
              <div class="fs-6 text-gray-600">
                Two-factor authentication adds an extra layer of security to
                your account. To log in, in you'll need to provide a 4 digit
                amazing code. <a href="#" class="fw-bold">Learn More</a>
              </div>
            </div>
            <!--end::Content-->
          </div>
          <!--end::Wrapper-->
        </div>

        <!--begin::Items-->
        <div class="py-2">
          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <img
                src="/media/svg/brand-logos/google-icon.svg"
                class="w-30px me-6"
                alt=""
              />

              <div class="d-flex flex-column">
                <a href="#" class="fs-5 text-dark text-hover-primary fw-bold"
                  >Google</a
                >
                <div class="fs-6 fw-semobold text-gray-400">
                  Plan properly your workflow
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div class="form-check form-check-solid form-switch">
                <input
                  class="form-check-input w-45px h-30px"
                  type="checkbox"
                  id="googleswitch"
                  checked
                />
                <label class="form-check-label" for="googleswitch"></label>
              </div>
            </div>
          </div>
          <!--end::Item-->

          <div class="separator separator-dashed my-5"></div>

          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <img
                src="/media/svg/brand-logos/github.svg"
                class="w-30px me-6"
                alt=""
              />

              <div class="d-flex flex-column">
                <a href="#" class="fs-5 text-dark text-hover-primary fw-bold"
                  >Github</a
                >
                <div class="fs-6 fw-semobold text-gray-400">
                  Keep eye on on your Repositories
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div class="form-check form-check-solid form-switch">
                <input
                  class="form-check-input w-45px h-30px"
                  type="checkbox"
                  id="githubswitch"
                  checked
                />
                <label class="form-check-label" for="githubswitch"></label>
              </div>
            </div>
          </div>
          <!--end::Item-->

          <div class="separator separator-dashed my-5"></div>

          <!--begin::Item-->
          <div class="d-flex flex-stack">
            <div class="d-flex">
              <img
                src="/media/svg/brand-logos/slack-icon.svg"
                class="w-30px me-6"
                alt=""
              />

              <div class="d-flex flex-column">
                <a href="#" class="fs-5 text-dark text-hover-primary fw-bold"
                  >Slack</a
                >
                <div class="fs-6 fw-semobold text-gray-400">
                  Integrate Projects Discussions
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div class="form-check form-check-solid form-switch">
                <input
                  class="form-check-input w-45px h-30px"
                  type="checkbox"
                  id="slackswitch"
                />
                <label class="form-check-label" for="slackswitch"></label>
              </div>
            </div>
          </div>
          <!--end::Item-->
        </div>
        <!--end::Items-->
      </div>
      <!--end::Card body-->

      <!--begin::Card footer-->
      <div class="card-footer d-flex justify-content-end py-6 px-9">
        <button class="btn btn-light btn-active-light-primary me-2">
          Discard
        </button>
        <button
          ref="submitButton2"
          class="btn btn-primary"
          @click="saveChanges2()"
        >
          <span class="indicator-label"> Save Changes </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <!--end::Card footer-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Connected Accounts-->

  <!--begin::Notifications-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_email_preferences"
      aria-expanded="true"
      aria-controls="kt_account_email_preferences"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Email Preferences</h3>
      </div>
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_email_preferences" class="collapse show">
      <!--begin::Form-->
      <form class="form" @submit.prevent="saveChanges3()">
        <!--begin::Card body-->
        <div class="card-body border-top px-9 py-9">
          <!--begin::Option-->
          <label
            class="form-check form-check-custom form-check-solid align-items-start"
          >
            <!--begin::Input-->
            <input
              class="form-check-input me-3"
              type="checkbox"
              name="email-preferences1"
              value="1"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span class="form-check-label d-flex flex-column align-items-start">
              <span class="fw-bold fs-5 mb-0">Successful Payments</span>
              <span class="text-muted fs-6"
                >Receive a notification for every successful payment.</span
              >
            </span>
            <!--end::Label-->
          </label>
          <!--end::Option-->
          <!--begin::Option-->
          <div class="separator separator-dashed my-6"></div>
          <!--end::Option-->

          <!--begin::Option-->
          <label
            class="form-check form-check-custom form-check-solid align-items-start"
          >
            <!--begin::Input-->
            <input
              class="form-check-input me-3"
              type="checkbox"
              name="email-preferences1"
              checked
              value="1"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span class="form-check-label d-flex flex-column align-items-start">
              <span class="fw-bold fs-5 mb-0">Payouts</span>
              <span class="text-muted fs-6"
                >Receive a notification for every initiated payout.</span
              >
            </span>
            <!--end::Label-->
          </label>
          <!--end::Option-->
          <!--begin::Option-->
          <div class="separator separator-dashed my-6"></div>
          <!--end::Option-->

          <!--begin::Option-->
          <label
            class="form-check form-check-custom form-check-solid align-items-start"
          >
            <!--begin::Input-->
            <input
              class="form-check-input me-3"
              type="checkbox"
              name="email-preferences1"
              value="1"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span class="form-check-label d-flex flex-column align-items-start">
              <span class="fw-bold fs-5 mb-0">Fee Collection</span>
              <span class="text-muted fs-6"
                >Receive a notification each time you collect a fee from
                sales</span
              >
            </span>
            <!--end::Label-->
          </label>
          <!--end::Option-->
          <!--begin::Option-->
          <div class="separator separator-dashed my-6"></div>
          <!--end::Option-->

          <!--begin::Option-->
          <label
            class="form-check form-check-custom form-check-solid align-items-start"
          >
            <!--begin::Input-->
            <input
              class="form-check-input me-3"
              type="checkbox"
              name="email-preferences1"
              checked
              value="1"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span class="form-check-label d-flex flex-column align-items-start">
              <span class="fw-bold fs-5 mb-0">Customer Payment Dispute</span>
              <span class="text-muted fs-6"
                >Receive a notification if a payment is disputed by a customer
                and for dispute purposes.</span
              >
            </span>
            <!--end::Label-->
          </label>
          <!--end::Option-->
          <!--begin::Option-->
          <div class="separator separator-dashed my-6"></div>
          <!--end::Option-->

          <!--begin::Option-->
          <label
            class="form-check form-check-custom form-check-solid align-items-start"
          >
            <!--begin::Input-->
            <input
              class="form-check-input me-3"
              type="checkbox"
              name="email-preferences1"
              value="1"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span class="form-check-label d-flex flex-column align-items-start">
              <span class="fw-bold fs-5 mb-0">Refund Alerts</span>
              <span class="text-muted fs-6"
                >Receive a notification if a payment is stated as risk by the
                Finance Department.</span
              >
            </span>
            <!--end::Label-->
          </label>
          <!--end::Option-->
          <!--begin::Option-->
          <div class="separator separator-dashed my-6"></div>
          <!--end::Option-->

          <!--begin::Option-->
          <label
            class="form-check form-check-custom form-check-solid align-items-start"
          >
            <!--begin::Input-->
            <input
              class="form-check-input me-3"
              type="checkbox"
              name="email-preferences1"
              checked
              value="1"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span class="form-check-label d-flex flex-column align-items-start">
              <span class="fw-bold fs-5 mb-0">Invoice Payments</span>
              <span class="text-muted fs-6"
                >Receive a notification if a customer sends an incorrect amount
                to pay their invoice.</span
              >
            </span>
            <!--end::Label-->
          </label>
          <!--end::Option-->
          <!--begin::Option-->
          <div class="separator separator-dashed my-6"></div>
          <!--end::Option-->

          <!--begin::Option-->
          <label
            class="form-check form-check-custom form-check-solid align-items-start"
          >
            <!--begin::Input-->
            <input
              class="form-check-input me-3"
              type="checkbox"
              name="email-preferences1"
              value="1"
            />
            <!--end::Input-->

            <!--begin::Label-->
            <span class="form-check-label d-flex flex-column align-items-start">
              <span class="fw-bold fs-5 mb-0">Webhook API Endpoints</span>
              <span class="text-muted fs-6"
                >Receive notifications for consistently failing webhook API
                endpoints.</span
              >
            </span>
            <!--end::Label-->
          </label>
          <!--end::Option-->
          <!--begin::Option-->
          <div class="separator separator-dashed my-6"></div>
          <!--end::Option-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button class="btn btn-light btn-active-light-primary me-2">
            Discard
          </button>
          <button
            ref="submitButton3"
            type="submit"
            class="btn btn-primary px-6"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Notifications-->

  <!--begin::Notifications-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_notifications"
      aria-expanded="true"
      aria-controls="kt_account_notifications"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Notifications</h3>
      </div>
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_notifications" class="collapse show">
      <!--begin::Form-->
      <form class="form" @submit.prevent="saveChanges4()">
        <!--begin::Card body-->
        <div class="card-body border-top px-9 pt-3 pb-4">
          <!--begin::Table-->
          <div class="table-responsive">
            <table
              class="table table-row-dashed border-gray-300 align-middle gy-6"
            >
              <tbody class="fs-6 fw-semobold">
                <!--begin::Table row-->
                <tr>
                  <td class="min-w-250px fs-4 fw-bold">Notifications</td>
                  <td class="w-125px">
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="kt_settings_notification_email"
                        checked
                        data-kt-check="true"
                        data-kt-check-target="[data-kt-settings-notification=email]"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="kt_settings_notification_email"
                      >
                        Email
                      </label>
                    </div>
                  </td>
                  <td class="w-125px">
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="kt_settings_notification_phone"
                        checked
                        data-kt-check="true"
                        data-kt-check-target="[data-kt-settings-notification=phone]"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="kt_settings_notification_phone"
                      >
                        Phone
                      </label>
                    </div>
                  </td>
                </tr>
                <!--begin::Table row-->

                <!--begin::Table row-->
                <tr>
                  <td>Billing Updates</td>
                  <td>
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="1"
                        id="billing1"
                        checked
                        data-kt-settings-notification="email"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="billing1"
                      ></label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="billing2"
                        checked
                        data-kt-settings-notification="phone"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="billing2"
                      ></label>
                    </div>
                  </td>
                </tr>
                <!--begin::Table row-->

                <!--begin::Table row-->
                <tr>
                  <td>New Team Members</td>
                  <td>
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="team1"
                        checked
                        data-kt-settings-notification="email"
                      />
                      <label class="form-check-label ps-2" for="team1"></label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="team2"
                        data-kt-settings-notification="phone"
                      />
                      <label class="form-check-label ps-2" for="team2"></label>
                    </div>
                  </td>
                </tr>
                <!--begin::Table row-->

                <!--begin::Table row-->
                <tr>
                  <td>Completed Projects</td>
                  <td>
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="project1"
                        data-kt-settings-notification="email"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="project1"
                      ></label>
                    </div>
                  </td>
                  <td>
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="project2"
                        checked
                        data-kt-settings-notification="phone"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="project2"
                      ></label>
                    </div>
                  </td>
                </tr>
                <!--begin::Table row-->

                <!--begin::Table row-->
                <tr>
                  <td class="border-bottom-0">Newsletters</td>
                  <td class="border-bottom-0">
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="newsletter1"
                        data-kt-settings-notification="email"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="newsletter1"
                      ></label>
                    </div>
                  </td>
                  <td class="border-bottom-0">
                    <div class="form-check form-check-solid">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="newsletter2"
                        data-kt-settings-notification="phone"
                      />
                      <label
                        class="form-check-label ps-2"
                        for="newsletter2"
                      ></label>
                    </div>
                  </td>
                </tr>
                <!--begin::Table row-->
              </tbody>
            </table>
          </div>
          <!--end::Table-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button class="btn btn-light btn-active-light-primary me-2">
            Discard
          </button>
          <button
            ref="submitButton4"
            type="submit"
            class="btn btn-primary px-6"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Notifications-->

  <!--begin::Deactivate Account-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_deactivate"
      aria-expanded="true"
      aria-controls="kt_account_deactivate"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Deactivate Account</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_deactivate" class="collapse show">
      <!--begin::Form-->
      <form
        id="kt_account_deactivate_form"
        class="form"
        @submit.prevent="deactivateAccount()"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <div
            class="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6"
          >
            <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
              <inline-svg src="/media/icons/duotune/general/gen044.svg" />
            </span>
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack flex-grow-1">
              <!--begin::Content-->
              <div class="fw-semobold">
                <h4 class="text-gray-800 fw-bold">
                  You Are Deactivating Your Account
                </h4>

                <div class="fs-6 text-gray-600">
                  For extra security, this requires you to confirm your email or
                  phone number when you reset yousignr password. <br /><a
                    class="fw-bold"
                    href="#"
                    >Learn more</a
                  >
                </div>
              </div>
              <!--end::Content-->
            </div>
            <!--end::Wrapper-->
          </div>

          <!--begin::Form input row-->
          <div class="form-check form-check-solid fv-row">
            <input
              name="deactivate"
              class="form-check-input"
              type="checkbox"
              value=""
              id="deactivate"
            />
            <label
              class="form-check-label fw-semobold ps-2 fs-6"
              for="deactivate"
              >Confirm Account Deactivation</label
            >
          </div>
          <!--end::Form input row-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            id="kt_account_deactivate_account_submit"
            ref="submitButton5"
            type="submit"
            class="btn btn-danger fw-semobold"
          >
            <span class="indicator-label"> Deactivate Account </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Deactivate Account-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ISOLanguage from "@/iso/ISO_639-2_languages.json";
import ISOCurrencies from "@/iso/ISO_4217_currencies.json";
import ISOCountries from "@/iso/ISO-3166-countries.json";
import Timezones from "@/iso/timezones.json";
import { string } from "yup/lib/locale";
import { useAccountStore, type Account } from "@/stores/account";

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    //global variables for the component
    const store = useAccountStore();

    // Fetch Account Details on page load
    onMounted(() => {
      fetchAccount();
    });

    // Fetch  Account Details
    const profileDetails = ref<Account>({} as Account);
    const submitButton1 = ref<HTMLElement | null>(null);

    const fetchAccount = async () => {
      const res = await store.fetchAccount();
      // set form values to account details
      profileDetails.value = store.account;
    };

    // Validations Account Details
    const profileDetailsValidator = Yup.object().shape({
      first_name: Yup.string().nullable().label("First name"),
      middle_name: Yup.string().nullable().label("First name"),
      last_name: Yup.string().nullable().label("Last name"),
      mobile: Yup.string().nullable().label("Contact phone"),
      email: Yup.string().nullable().label("Email"),
      country: Yup.string().nullable().label("Country"),
      language: Yup.string().nullable().label("Language"),
      timezone: Yup.string().nullable().label("Timezone"),
      currency: Yup.string().nullable().label("Currency"),
    });

    const saveChanges1 = async () => {
      const payload = profileDetails.value;
      payload.private = profileDetails.value.private ? 1 : 0;
      const res = await store.updateAccount(payload as Account);
      if (res?.succeed) {
        fetchAccount();
      }

      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton1.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    const changePassword = Yup.object().shape({
      currentpassword: Yup.string().required().label("Current password"),
      newpassword: Yup.string().min(4).required().label("Password"),
      confirmpassword: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const saveChanges2 = () => {
      if (submitButton2.value) {
        // Activate indicator
        submitButton2.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton2.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const saveChanges3 = () => {
      if (submitButton3.value) {
        // Activate indicator
        submitButton3.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton3.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const saveChanges4 = () => {
      if (submitButton4.value) {
        // Activate indicator
        submitButton4.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton4.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const deactivateAccount = () => {
      if (submitButton5.value) {
        // Activate indicator
        submitButton5.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton5.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: "Email is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            emailFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const updateEmail = () => {
      if (updateEmailButton.value) {
        // Activate indicator
        updateEmailButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updateEmailButton.value?.removeAttribute("data-kt-indicator");

          emailFormDisplay.value = false;
        }, 2000);
      }
    };

    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: "Password is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            passwordFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const removeImage = () => {
      profileDetails.value.avatar = "/media/avatars/blank.png";
    };

    const truncate = (value: string, len: number = 40) => {
      if (value) {
        if (value.length > len) {
          value = value.substring(0, len - 3) + "...";
        }
        return value;
      }
    };
    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,
      saveChanges2,
      saveChanges3,
      saveChanges4,
      deactivateAccount,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      profileDetailsValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updateEmail,
      updatePassword,
      ISOLanguage,
      ISOCurrencies,
      ISOCountries,
      Timezones,
      truncate,
    };
  },
});
</script>
