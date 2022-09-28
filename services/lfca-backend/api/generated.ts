/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AchievementFunnelStats = {
  __typename?: 'AchievementFunnelStats';
  companiesAchievementReachedCount: Scalars['Int'];
  companiesCompletedFirstActionCount: Scalars['Int'];
  companiesCreatedCount: Scalars['Int'];
  /**
   * NOTE:
   * Logins are note related to the defined timerange.
   * Instead this property only indicates how many of the resulted companies have at least logged in once,
   * regardless of when the login happened.
   */
  companiesLoggedInCount: Scalars['Int'];
};

export type AchievementFunnelStatsInput = {
  achievementContentIds?: InputMaybe<Array<Scalars['String']>>;
  companiesCreatedFrom: Scalars['DateTime'];
  companiesCreatedUntil: Scalars['DateTime'];
  companySubscriptionType?: InputMaybe<CompanySubscriptionType>;
  programContentId?: InputMaybe<Scalars['String']>;
  statsUntil: Scalars['DateTime'];
};

export type ActionComment = {
  __typename?: 'ActionComment';
  attachments: Array<ActionCommentAttachment>;
  author?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
};

export type ActionCommentAttachment = {
  __typename?: 'ActionCommentAttachment';
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  source: Scalars['String'];
};

export type ActionCommentAttachmentsInput = {
  actionContentId: Scalars['String'];
};

export type ActionCommentsInput = {
  actionContentId: Scalars['String'];
};

export type ActionStats = {
  __typename?: 'ActionStats';
  actionCompletedCount: Scalars['Int'];
  actionCompletedCountTotal: Scalars['Int'];
  actionContentId: Scalars['String'];
  category?: Maybe<Scalars['String']>;
};

export type ActionStatsInput = {
  statsFrom: Scalars['DateTime'];
  statsUntil: Scalars['DateTime'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sortWeight?: Maybe<Scalars['Int']>;
};

export type CompaniesInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CompaniesInputFilter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type CompaniesInputFilter = {
  companyIds?: InputMaybe<Array<Scalars['String']>>;
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
};

export type CompaniesResult = {
  __typename?: 'CompaniesResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<Company>;
};

export type Company = {
  __typename?: 'Company';
  aboutSections?: Maybe<Array<Maybe<CompanyAboutSection>>>;
  /** Returns achievement contentIds that have been reached once (even though they have expired) based on the AchievementLog. */
  achievementContendIdsReachedOnce: Array<Scalars['String']>;
  campaignContribution?: Maybe<Scalars['String']>;
  campaignFiles: Array<File>;
  campaignGoals?: Maybe<Scalars['String']>;
  campaignParticipationPackages?: Maybe<Scalars['JSON']>;
  completedCompanyActions: Array<CompanyAction>;
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  crmId?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  employeeCount: Scalars['Int'];
  id: Scalars['ID'];
  internalDescription?: Maybe<Scalars['String']>;
  logoUrl?: Maybe<Scalars['String']>;
  micrositeSlug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  plannedCompanyActions: Array<CompanyAction>;
  program: CompanyProgram;
  programContentId: Scalars['String'];
  subscriptionType: CompanySubscriptionType;
  tags: Array<CompanyTag>;
  users: Array<User>;
  websiteUrl?: Maybe<Scalars['String']>;
};


export type CompanyUsersArgs = {
  filter?: InputMaybe<UsersInputFilter>;
};

export type CompanyAboutSection = {
  __typename?: 'CompanyAboutSection';
  heading?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type CompanyAboutSectionInput = {
  heading?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type CompanyAchievement = {
  __typename?: 'CompanyAchievement';
  completedCompanyActionsCount: Scalars['Int'];
  completedRequiredCompanyActionsCount: Scalars['Int'];
  contentId: Scalars['ID'];
  editableCompanyProperties: Array<Scalars['String']>;
  micrositeUrl?: Maybe<Scalars['String']>;
  minCompletedCompanyActionsCount?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  recommendedActions: Array<CompanyAction>;
  requiredActions: Array<CompanyAction>;
};

export type CompanyAction = {
  __typename?: 'CompanyAction';
  badge?: Maybe<ContentAsset>;
  categories: Array<Category>;
  commentAttachmentCount: Scalars['Int'];
  commentCount: Scalars['Int'];
  comments: Array<ActionComment>;
  companiesCompletedCount: Scalars['Int'];
  /** Counts companies that have the action either planned or completed */
  companiesDoingCount: Scalars['Int'];
  companiesPlannedCount: Scalars['Int'];
  companyId?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  heroImage?: Maybe<ContentAsset>;
  /** A unique identifier generated using the contentId and companyId as long as the action has not expired */
  id: Scalars['ID'];
  impactValue: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  plannedAt?: Maybe<Scalars['DateTime']>;
  recentCompaniesCompleted: Array<Company>;
  /** Returns companies that have the action either planned or completed */
  recentCompaniesDoing: Array<Company>;
  recommendedForCompanyAchievementIds: Array<Scalars['ID']>;
  requiredForCompanyAchievementIds: Array<Scalars['ID']>;
  requirements: Array<CompanyActionRequirement>;
  serviceProviderList?: Maybe<ServiceProviderList>;
  title?: Maybe<Scalars['String']>;
};


export type CompanyActionRecentCompaniesCompletedArgs = {
  limit: Scalars['Int'];
};


export type CompanyActionRecentCompaniesDoingArgs = {
  limit: Scalars['Int'];
};

export type CompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
};

export type CompanyActionRequirement = {
  __typename?: 'CompanyActionRequirement';
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier generated using the CompanyAction.id and contentId */
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type CompanyActionsInput = {
  filter?: InputMaybe<CompanyActionsInputFilter>;
};

export type CompanyActionsInputFilter = {
  actionContentIds?: InputMaybe<Array<Scalars['String']>>;
  companyId?: InputMaybe<Scalars['ID']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
  isPlanned?: InputMaybe<Scalars['Boolean']>;
};

export type CompanyInput = {
  companyId?: InputMaybe<Scalars['ID']>;
  companyMicrositeSlug?: InputMaybe<Scalars['String']>;
};

export type CompanyProgram = {
  __typename?: 'CompanyProgram';
  achievements: Array<CompanyAchievement>;
  availableMeasurementOptions: Array<Scalars['String']>;
  contentId: Scalars['ID'];
  name: Scalars['String'];
};

export enum CompanySubscriptionType {
  Basic = 'BASIC',
  Free = 'FREE',
  Premium = 'PREMIUM',
  Sponsored = 'SPONSORED',
  VcPortfolio = 'VC_PORTFOLIO'
}

export type CompanyTag = {
  __typename?: 'CompanyTag';
  name: Scalars['ID'];
};

export type CompleteCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  companyId?: InputMaybe<Scalars['ID']>;
  isCompleted: Scalars['Boolean'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CompleteCompanyActionRequirementInput = {
  actionContentId: Scalars['String'];
  actionRequirementContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type CompleteUserActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  notes?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Scalars['JSON']>;
};

export type ContentAsset = {
  __typename?: 'ContentAsset';
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

export type CounterStatsResult = {
  __typename?: 'CounterStatsResult';
  actionCompletedCount: Scalars['Int'];
  companyCount: Scalars['Int'];
  countryCount: Scalars['Int'];
  employeeCount: Scalars['Int'];
  leaderCount: Scalars['Int'];
};

export type CreateActionCommentAttachmentInput = {
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  source: Scalars['String'];
};

export type CreateActionCommentInput = {
  actionContentId: Scalars['String'];
  attachments?: InputMaybe<Array<CreateActionCommentAttachmentInput>>;
  message: Scalars['String'];
};

export type CreateCompanyInput = {
  country: Scalars['String'];
  crmId?: InputMaybe<Scalars['String']>;
  employeeCount: Scalars['Int'];
  internalDescription?: InputMaybe<Scalars['String']>;
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  programContentId: Scalars['String'];
  subscriptionType: CompanySubscriptionType;
  tags?: InputMaybe<Array<Scalars['String']>>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type CreateEventParticipationRequestInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  eventId: Scalars['ID'];
  userId?: InputMaybe<Scalars['ID']>;
};

export type CreateServiceProviderReviewInput = {
  cons?: InputMaybe<Array<Scalars['String']>>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Int']>;
  pros?: InputMaybe<Array<Scalars['String']>>;
  rating: Scalars['Float'];
  review: Scalars['String'];
  serviceProviderContentId: Scalars['String'];
};

export type CreateUserInviteInput = {
  /**
   * Admin-only: Optionally defined the company the user should be assigned to.
   * Default: Company of the requesting user.
   */
  companyId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /**
   * Admin-only: Optionally define the role for the new user.
   * Default: OFFICER.
   */
  userRole?: InputMaybe<Scalars['String']>;
};

export type DeleteActionCommentInput = {
  id: Scalars['ID'];
};

export type DeleteCompanyInput = {
  companyId: Scalars['ID'];
};

export type DeleteEventParticipationRequestInput = {
  eventId: Scalars['ID'];
  userId?: InputMaybe<Scalars['ID']>;
};

export type DeleteServiceProviderReviewInput = {
  serviceProviderReviewId: Scalars['ID'];
};

export type DeleteUserInput = {
  userId: Scalars['ID'];
};

export type Event = {
  __typename?: 'Event';
  description: Scalars['String'];
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isAllDay: Scalars['Boolean'];
  participationRequestStatus?: Maybe<EventParticipationStatus>;
  /** NOTE: Admin only prop! */
  participationRequests: Array<EventParticipationRequest>;
  participationRequestsApprovedCount: Scalars['Int'];
  participationRequestsPendingCount: Scalars['Int'];
  recurrence?: Maybe<Scalars['String']>;
  start: Scalars['DateTime'];
  status: EventStatus;
  title: Scalars['String'];
  videoConferenceUrl?: Maybe<Scalars['String']>;
};

export type EventParticipationRequest = {
  __typename?: 'EventParticipationRequest';
  event: Event;
  id: Scalars['ID'];
  status: EventParticipationStatus;
  user?: Maybe<User>;
};

export type EventParticipationRequestsInput = {
  eventId: Scalars['ID'];
};

export enum EventParticipationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING'
}

export type EventStatsInput = {
  companySubscriptionType?: InputMaybe<CompanySubscriptionType>;
};

export type EventStatsResult = {
  __typename?: 'EventStatsResult';
  participationRequestsApprovedCount: Scalars['Int'];
  participationRequestsPendingCount: Scalars['Int'];
  runningEventsCount: Scalars['Int'];
};

export enum EventStatus {
  Expired = 'EXPIRED',
  Running = 'RUNNING',
  Upcoming = 'UPCOMING'
}

export type EventsInput = {
  includeExpired?: InputMaybe<Scalars['Boolean']>;
};

export type File = {
  __typename?: 'File';
  name?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type FileInput = {
  name?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeCompanyAction: CompanyAction;
  completeCompanyActionRequirement: CompanyActionRequirement;
  completeUserAction: UserAction;
  createActionComment: ActionComment;
  createActionCommentExport: Scalars['String'];
  createCompany: Company;
  createCompanyExport: Scalars['String'];
  createEventParticipationRequest: EventParticipationRequest;
  createServiceProviderReview: ServiceProviderReview;
  createUserExport: Scalars['String'];
  createUserInvite: UserInvite;
  deleteActionComment: Scalars['Boolean'];
  deleteCompany: Company;
  deleteEventParticipationRequest: EventParticipationRequest;
  deleteServiceProviderReview: ServiceProviderReview;
  deleteUser: User;
  planCompanyAction: CompanyAction;
  processCompanyActionDeprecation: Scalars['Boolean'];
  processCompanyActionExpiry: Scalars['Boolean'];
  processUserActionExpiry: Scalars['Boolean'];
  pushAchievementFunnelStatsToGeckoboard: Scalars['Boolean'];
  pushActionsCompletedStatsToGeckoboard: Scalars['Boolean'];
  pushEventStatsToGeckoboard: Scalars['Boolean'];
  /** Allows users to register if they have been invited */
  registerUser: User;
  requestPasswordReset: Scalars['Boolean'];
  updateActionComment: ActionComment;
  updateCompany: Company;
  updateEventParticipationRequest: EventParticipationRequest;
  updateServiceProviderReview: ServiceProviderReview;
  updateUser: User;
};


export type MutationCompleteCompanyActionArgs = {
  input: CompleteCompanyActionInput;
};


export type MutationCompleteCompanyActionRequirementArgs = {
  input: CompleteCompanyActionRequirementInput;
};


export type MutationCompleteUserActionArgs = {
  input: CompleteUserActionInput;
};


export type MutationCreateActionCommentArgs = {
  input: CreateActionCommentInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateEventParticipationRequestArgs = {
  input: CreateEventParticipationRequestInput;
};


export type MutationCreateServiceProviderReviewArgs = {
  input: CreateServiceProviderReviewInput;
};


export type MutationCreateUserInviteArgs = {
  input: CreateUserInviteInput;
};


export type MutationDeleteActionCommentArgs = {
  input: DeleteActionCommentInput;
};


export type MutationDeleteCompanyArgs = {
  input: DeleteCompanyInput;
};


export type MutationDeleteEventParticipationRequestArgs = {
  input: DeleteEventParticipationRequestInput;
};


export type MutationDeleteServiceProviderReviewArgs = {
  input: DeleteServiceProviderReviewInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationPlanCompanyActionArgs = {
  input: PlanCompanyActionInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationUpdateActionCommentArgs = {
  input: UpdateActionCommentInput;
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateEventParticipationRequestArgs = {
  input: UpdateEventParticipationRequestInput;
};


export type MutationUpdateServiceProviderReviewArgs = {
  input: UpdateServiceProviderReviewInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PlanCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  companyId?: InputMaybe<Scalars['ID']>;
  isPlanned: Scalars['Boolean'];
};

export type QualifiedCompaniesInput = {
  achievementContentIds: Array<Scalars['String']>;
  filter?: InputMaybe<QualifiedCompaniesInputFilter>;
};

export type QualifiedCompaniesInputFilter = {
  companyMicrositeSlugs?: InputMaybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  achievementFunnelStats: AchievementFunnelStats;
  actionCommentAttachments: Array<ActionCommentAttachment>;
  actionComments: Array<ActionComment>;
  actionStats: Array<ActionStats>;
  companies: CompaniesResult;
  company: Company;
  companyAction: CompanyAction;
  companyActions: Array<CompanyAction>;
  companyTags: Array<CompanyTag>;
  counterStats: CounterStatsResult;
  eventParticipationRequests: Array<EventParticipationRequest>;
  eventStats: EventStatsResult;
  events: Array<Event>;
  qualifiedCompanies: Array<Company>;
  searchCompany: Array<Company>;
  searchUser: Array<User>;
  serviceProviderLists: Array<ServiceProviderList>;
  serviceProviderReviews: ServiceProviderReviewsResult;
  serviceProviders: Array<ServiceProvider>;
  user: User;
  userActions: Array<UserAction>;
  userInvites: Array<UserInvite>;
  users: UsersResult;
};


export type QueryAchievementFunnelStatsArgs = {
  input: AchievementFunnelStatsInput;
};


export type QueryActionCommentAttachmentsArgs = {
  input: ActionCommentAttachmentsInput;
};


export type QueryActionCommentsArgs = {
  input: ActionCommentsInput;
};


export type QueryActionStatsArgs = {
  input: ActionStatsInput;
};


export type QueryCompaniesArgs = {
  input?: InputMaybe<CompaniesInput>;
};


export type QueryCompanyArgs = {
  input?: InputMaybe<CompanyInput>;
};


export type QueryCompanyActionArgs = {
  input: CompanyActionInput;
};


export type QueryCompanyActionsArgs = {
  input?: InputMaybe<CompanyActionsInput>;
};


export type QueryEventParticipationRequestsArgs = {
  input: EventParticipationRequestsInput;
};


export type QueryEventStatsArgs = {
  input?: InputMaybe<EventStatsInput>;
};


export type QueryEventsArgs = {
  input?: InputMaybe<EventsInput>;
};


export type QueryQualifiedCompaniesArgs = {
  input: QualifiedCompaniesInput;
};


export type QuerySearchCompanyArgs = {
  input: SearchCompanyInput;
};


export type QuerySearchUserArgs = {
  input: SearchUserInput;
};


export type QueryServiceProviderReviewsArgs = {
  input?: InputMaybe<ServiceProviderReviewsInput>;
};


export type QueryServiceProvidersArgs = {
  input?: InputMaybe<ServiceProvidersInput>;
};


export type QueryUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type QueryUserActionsArgs = {
  input?: InputMaybe<UserActionsInput>;
};


export type QueryUserInvitesArgs = {
  input?: InputMaybe<UserInvitesInput>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UsersInput>;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
};

export type RequestPasswordResetInput = {
  email: Scalars['String'];
};

export type SearchCompanyInput = {
  query: Scalars['String'];
};

export type SearchUserInput = {
  query: Scalars['String'];
};

export type ServiceProvider = {
  __typename?: 'ServiceProvider';
  averageRating?: Maybe<Scalars['Float']>;
  certifications: Array<Tag>;
  description?: Maybe<Scalars['JSON']>;
  email?: Maybe<Scalars['String']>;
  featureCta?: Maybe<Scalars['String']>;
  featureDescription?: Maybe<Scalars['String']>;
  featureImage?: Maybe<ContentAsset>;
  featureTitle?: Maybe<Scalars['String']>;
  freeDemo: Scalars['Boolean'];
  highestPrice?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
  languages: Array<Tag>;
  logo?: Maybe<ContentAsset>;
  lowestPrice?: Maybe<Scalars['Int']>;
  memberId?: Maybe<Scalars['String']>;
  model: Array<Tag>;
  name: Scalars['String'];
  reviewsCount: Scalars['Int'];
  services: Array<Tag>;
  size?: Maybe<Scalars['String']>;
  supplyChainComplexity: Array<Tag>;
  website?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type ServiceProviderFilter = {
  __typename?: 'ServiceProviderFilter';
  attribute: Scalars['String'];
  condition: ServiceProviderFilterCondition;
  id: Scalars['ID'];
  label: Scalars['String'];
  question?: Maybe<Scalars['String']>;
  type: ServiceProviderFilterType;
  values?: Maybe<Array<ServiceProviderFilterValue>>;
};

export enum ServiceProviderFilterCondition {
  Contains = 'CONTAINS',
  ContainsAll = 'CONTAINS_ALL',
  ValueBelow = 'VALUE_BELOW'
}

export enum ServiceProviderFilterType {
  Multiselect = 'MULTISELECT',
  Select = 'SELECT'
}

export type ServiceProviderFilterValue = {
  __typename?: 'ServiceProviderFilterValue';
  id: Scalars['ID'];
  integerValue?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  stringValue?: Maybe<Scalars['String']>;
  type: ServiceProviderFilterValueType;
};

export enum ServiceProviderFilterValueType {
  Integer = 'INTEGER',
  String = 'STRING'
}

export type ServiceProviderList = {
  __typename?: 'ServiceProviderList';
  featured: Array<ServiceProvider>;
  filters: Array<ServiceProviderFilter>;
  id: Scalars['ID'];
  items: Array<ServiceProvider>;
  title: Scalars['String'];
};

export type ServiceProviderReview = {
  __typename?: 'ServiceProviderReview';
  /** ServiceProviderReview's can be anonymous so we might not always get a user */
  author?: Maybe<User>;
  cons: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isAnonymous: Scalars['Boolean'];
  price?: Maybe<Scalars['Int']>;
  pros: Array<Scalars['String']>;
  rating: Scalars['Float'];
  review: Scalars['String'];
  serviceProviderContentId: Scalars['String'];
};

export type ServiceProviderReviewsFilterInput = {
  isApproved?: InputMaybe<Scalars['Boolean']>;
  serviceProviderContentId?: InputMaybe<Scalars['String']>;
};

export type ServiceProviderReviewsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ServiceProviderReviewsFilterInput>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ServiceProviderReviewsResult = {
  __typename?: 'ServiceProviderReviewsResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<ServiceProviderReview>;
};

export type ServiceProvidersInput = {
  filter?: InputMaybe<ServiceProvidersInputFilter>;
};

export type ServiceProvidersInputFilter = {
  serviceProviderContentIds?: InputMaybe<Array<Scalars['String']>>;
};

export type Tag = {
  __typename?: 'Tag';
  help?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sortWeight?: Maybe<Scalars['Int']>;
};

export type UpdateActionCommentInput = {
  attachments?: InputMaybe<Array<CreateActionCommentAttachmentInput>>;
  authorId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  aboutSections?: InputMaybe<Array<CompanyAboutSectionInput>>;
  campaignContribution?: InputMaybe<Scalars['String']>;
  campaignFiles?: InputMaybe<Array<FileInput>>;
  campaignGoals?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['ID']>;
  country?: InputMaybe<Scalars['String']>;
  crmId?: InputMaybe<Scalars['String']>;
  employeeCount?: InputMaybe<Scalars['Int']>;
  internalDescription?: InputMaybe<Scalars['String']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  micrositeSlug?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  programContentId?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<CompanySubscriptionType>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateEventParticipationRequestInput = {
  approved: Scalars['Boolean'];
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type UpdateServiceProviderReviewInput = {
  authorId?: InputMaybe<Scalars['ID']>;
  cons?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Int']>;
  pros?: InputMaybe<Array<Scalars['String']>>;
  rating?: InputMaybe<Scalars['Float']>;
  review?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  companyId?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  sortWeight?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Company>;
  completedActions: Array<UserAction>;
  country: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  sortWeight: Scalars['Int'];
};

export type UserAction = {
  __typename?: 'UserAction';
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  editedAt: Scalars['DateTime'];
  expiredAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier generated using the contentId and userId as long as the action has not expired */
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  values?: Maybe<Scalars['JSON']>;
};

export type UserActionsInput = {
  filter?: InputMaybe<UserActionsInputFilter>;
};

export type UserActionsInputFilter = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
};

export type UserInput = {
  userId: Scalars['ID'];
};

export type UserInvite = {
  __typename?: 'UserInvite';
  email: Scalars['String'];
  id: Scalars['ID'];
  user?: Maybe<User>;
  userRole: Scalars['String'];
};

export type UserInvitesFilterInput = {
  companyId?: InputMaybe<Scalars['String']>;
};

export type UserInvitesInput = {
  /**
   * Admin-only: Allows filtering by company.
   * Default: Company of the requesting user.
   */
  filter?: InputMaybe<UserInvitesFilterInput>;
};

export type UsersInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<UsersInputFilter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type UsersInputFilter = {
  companyId?: InputMaybe<Scalars['ID']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
  userRoles?: InputMaybe<Array<Scalars['String']>>;
};

export type UsersResult = {
  __typename?: 'UsersResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<User>;
};

export type CompanyAchievementFragment = { __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, requiredActions: Array<{ __typename?: 'CompanyAction', id: string }> };

export type CompanyActionFragment = { __typename?: 'CompanyAction', contentId: string, description?: string | null, id: string, title?: string | null, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, categories: Array<{ __typename?: 'Category', name?: string | null, id: string }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, description?: string | null, id: string, title?: string | null }> };

export type CompanyDetailsFragment = { __typename?: 'Company', id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, achievementContendIdsReachedOnce: Array<string>, subscriptionType: CompanySubscriptionType, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, text?: string | null, imageUrl?: string | null } | null> | null, completedCompanyActions: Array<{ __typename?: 'CompanyAction', contentId: string, description?: string | null, id: string, title?: string | null, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, categories: Array<{ __typename?: 'Category', name?: string | null, id: string }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, description?: string | null, id: string, title?: string | null }> }>, plannedCompanyActions: Array<{ __typename?: 'CompanyAction', contentId: string, description?: string | null, id: string, title?: string | null, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, categories: Array<{ __typename?: 'Category', name?: string | null, id: string }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, description?: string | null, id: string, title?: string | null }> }>, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, requiredActions: Array<{ __typename?: 'CompanyAction', id: string }> }> } };

export type CompanyListItemFragment = { __typename?: 'Company', id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null };

export type CounterStatsResultFragment = { __typename?: 'CounterStatsResult', companyCount: number };

export type CompaniesQueryVariables = Exact<{
  input?: InputMaybe<CompaniesInput>;
}>;


export type CompaniesQuery = { __typename?: 'Query', companies: { __typename?: 'CompaniesResult', cursor?: string | null, items: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null }> } };

export type CompanyDetailsQueryVariables = Exact<{
  input: CompanyInput;
}>;


export type CompanyDetailsQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, achievementContendIdsReachedOnce: Array<string>, subscriptionType: CompanySubscriptionType, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, text?: string | null, imageUrl?: string | null } | null> | null, completedCompanyActions: Array<{ __typename?: 'CompanyAction', contentId: string, description?: string | null, id: string, title?: string | null, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, categories: Array<{ __typename?: 'Category', name?: string | null, id: string }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, description?: string | null, id: string, title?: string | null }> }>, plannedCompanyActions: Array<{ __typename?: 'CompanyAction', contentId: string, description?: string | null, id: string, title?: string | null, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, categories: Array<{ __typename?: 'Category', name?: string | null, id: string }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, description?: string | null, id: string, title?: string | null }> }>, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, requiredActions: Array<{ __typename?: 'CompanyAction', id: string }> }> } } };

export type CounterStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type CounterStatsQuery = { __typename?: 'Query', counterStats: { __typename?: 'CounterStatsResult', companyCount: number } };

export const CompanyActionFragmentDoc = gql`
    fragment CompanyAction on CompanyAction {
  contentId
  description
  id
  heroImage {
    id
    url
  }
  categories {
    name
    id
  }
  requirements {
    contentId
    description
    id
    title
  }
  title
}
    `;
export const CompanyAchievementFragmentDoc = gql`
    fragment CompanyAchievement on CompanyAchievement {
  completedCompanyActionsCount
  completedRequiredCompanyActionsCount
  contentId
  minCompletedCompanyActionsCount
  name
  requiredActions {
    id
  }
}
    `;
export const CompanyDetailsFragmentDoc = gql`
    fragment CompanyDetails on Company {
  aboutSections {
    heading
    text
    imageUrl
  }
  completedCompanyActions {
    ...CompanyAction
  }
  plannedCompanyActions {
    ...CompanyAction
  }
  id
  logoUrl
  micrositeSlug
  name
  achievementContendIdsReachedOnce
  program {
    contentId
    achievements {
      ...CompanyAchievement
    }
  }
  subscriptionType
}
    ${CompanyActionFragmentDoc}
${CompanyAchievementFragmentDoc}`;
export const CompanyListItemFragmentDoc = gql`
    fragment CompanyListItem on Company {
  id
  logoUrl
  micrositeSlug
  name
}
    `;
export const CounterStatsResultFragmentDoc = gql`
    fragment CounterStatsResult on CounterStatsResult {
  companyCount
}
    `;
export const CompaniesDocument = gql`
    query companies($input: CompaniesInput) {
  companies(input: $input) {
    cursor
    items {
      ...CompanyListItem
    }
  }
}
    ${CompanyListItemFragmentDoc}`;
export const CompanyDetailsDocument = gql`
    query companyDetails($input: CompanyInput!) {
  company(input: $input) {
    ...CompanyDetails
  }
}
    ${CompanyDetailsFragmentDoc}`;
export const CounterStatsDocument = gql`
    query counterStats {
  counterStats {
    ...CounterStatsResult
  }
}
    ${CounterStatsResultFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    companies(variables?: CompaniesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CompaniesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CompaniesQuery>(CompaniesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'companies', 'query');
    },
    companyDetails(variables: CompanyDetailsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CompanyDetailsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CompanyDetailsQuery>(CompanyDetailsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'companyDetails', 'query');
    },
    counterStats(variables?: CounterStatsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CounterStatsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CounterStatsQuery>(CounterStatsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'counterStats', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;