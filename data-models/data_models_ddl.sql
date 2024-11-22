--------------------------- Members Table ----------------------------

create table members
(
    id                           varchar(24)                not null
        primary key,
    uuid                         varchar(36),
    transient_id                 varchar(191)               not null,
    email                        varchar(191)               not null,
    status                       varchar(50) default 'free' not null,
    name                         varchar(191),
    expertise                    varchar(191),
    note                         varchar(2000),
    geolocation                  varchar(2000),
    enable_comment_notifications boolean     default '1'    not null,
    email_count                  integer     default '0'    not null,
    email_opened_count           integer     default '0'    not null,
    email_open_rate              integer,
    email_disabled               boolean     default '0'    not null,
    last_seen_at                 datetime,
    last_commented_at            datetime,
    created_at                   datetime                   not null,
    created_by                   varchar(24)                not null,
    updated_at                   datetime,
    updated_by                   varchar(24)
);

create index members_email_open_rate_index
    on members (email_open_rate);

create unique index members_email_unique
    on members (email);

create unique index members_transient_id_unique
    on members (transient_id);

create unique index members_uuid_unique
    on members (uuid);


--------------------------- Labels Table ---------------------------
create table labels
(
    id         varchar(24)  not null
        primary key,
    name       varchar(191) not null,
    slug       varchar(191) not null,
    created_at datetime     not null,
    created_by varchar(24)  not null,
    updated_at datetime,
    updated_by varchar(24)
);

create unique index labels_name_unique
    on labels (name);

create unique index labels_slug_unique
    on labels (slug);


--------------------------- PostsTable --------------------------------
create table posts
(
    id                           varchar(24)                  not null
        primary key,
    uuid                         varchar(36)                  not null,
    title                        varchar(2000)                not null,
    slug                         varchar(191)                 not null,
    mobiledoc                    text,
    lexical                      text,
    html                         text,
    comment_id                   varchar(50),
    plaintext                    text,
    feature_image                varchar(2000),
    featured                     boolean     default '0'      not null,
    type                         varchar(50) default 'post'   not null,
    status                       varchar(50) default 'draft'  not null,
    locale                       varchar(6),
    visibility                   varchar(50) default 'public' not null,
    email_recipient_filter       text                         not null,
    created_at                   datetime                     not null,
    created_by                   varchar(24)                  not null,
    updated_at                   datetime,
    updated_by                   varchar(24),
    published_at                 datetime,
    published_by                 varchar(24),
    custom_excerpt               varchar(2000),
    codeinjection_head           text,
    codeinjection_foot           text,
    custom_template              varchar(100),
    canonical_url                text,
    newsletter_id                varchar(24)
        references newsletters,
    show_title_and_feature_image boolean     default '1'      not null
);

create index posts_published_at_index
    on posts (published_at);

create unique index posts_slug_type_unique
    on posts (slug, type);

create index posts_type_status_updated_at_index
    on posts (type, status, updated_at);

create index posts_updated_at_index
    on posts (updated_at);


--------------------------- Tags Table ---------------------------
create table tags
(
    id                  varchar(24)                  not null
        primary key,
    name                varchar(191)                 not null,
    slug                varchar(191)                 not null,
    description         text,
    feature_image       varchar(2000),
    parent_id           varchar(191),
    visibility          varchar(50) default 'public' not null,
    og_image            varchar(2000),
    og_title            varchar(300),
    og_description      varchar(500),
    twitter_image       varchar(2000),
    twitter_title       varchar(300),
    twitter_description varchar(500),
    meta_title          varchar(2000),
    meta_description    varchar(2000),
    codeinjection_head  text,
    codeinjection_foot  text,
    canonical_url       varchar(2000),
    accent_color        varchar(50),
    created_at          datetime                     not null,
    created_by          varchar(24)                  not null,
    updated_at          datetime,
    updated_by          varchar(24)
);

create unique index tags_slug_unique
    on tags (slug);
