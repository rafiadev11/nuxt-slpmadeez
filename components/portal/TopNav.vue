<template>
    <div class="app-header-inner">
        <div class="container-fluid py-2">
            <div class="app-header-content">
                <div class="row justify-content-between align-items-center">
                    <div class="col-auto">
                        <a id="sidepanel-toggler" class="sidepanel-toggler d-inline-block d-xl-none" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                 role="img"><title>Menu</title>
                                <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                      stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="search-mobile-trigger d-sm-none col">
                        <i class="search-mobile-trigger-icon fas fa-search"></i>
                    </div>
                    <div class="app-search-box col">
                        <form class="app-search-form">
                            <input type="text" placeholder="Search..." name="search" class="form-control search-input">
                            <button type="submit" class="btn search-btn btn-primary" value="Search"><i
                                class="fas fa-search"></i></button>
                        </form>
                    </div>

                    <div class="app-utilities col-auto">
                        <div class="app-utility-item app-user-dropdown dropdown">
                            <a class="dropdown-toggle" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#"
                               role="button" aria-expanded="false">
                                <img src="/images/user.png" alt="user profile">
                                {{fullName}}
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#" @click.prevent="logout">Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopNav",
    data(){
        return {
            fullName: ''
        }
    },
    methods: {
        async logout(){
            await this.$auth.logout();
        }
    },
    created() {
        this.fullName = this.$auth.user.name;
    }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/vars";
@import "assets/scss/mixins";

.app-header-inner {
    position: relative;
}


.app-search-form {
    position: relative;
    max-width: 600px;

    .search-input {
        font-size: 0.875rem;
        border-radius: 0.25rem;
        padding-right: 3rem;
        padding-left: 1rem;

        &:focus {
            border-color: $theme-border-color;
        }
    }

    .search-btn {
        color: lighten($theme-text-color-secondary, 15%);
        background: none;
        border: none;
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 0;
        padding: 0.5rem 1rem;


        &:active, &:focus, &:hover {
            outline: none !important;
            color: $theme-color-primary;
            box-shadow: none;

        }

    }
}

.app-utility-item {
    display: inline-block;
    margin-right: 1.25rem;

    &:last-child {
        margin-right: 0;
    }

    & > a {
        color: $theme-text-color-secondary;

        &:hover {
            color: $theme-text-color-primary;
        }
    }

    .dropdown-toggle {
        position: relative;
    }

    .dropdown-menu {
        font-size: 0.875rem;
        margin: 0;
    }

    .dropdown-menu.show {
        top: 23px !important;
    }

    .icon {
        font-size: 1.25rem;
        width: 24px;
        height: 24px;
    }

    .icon-badge {
        display: inline-block;
        border-radius: 50%;
        position: absolute;
        right: -0.45rem;
        top: -0.3rem;
        width: 20px;
        height: 20px;
        font-size: 0.6rem;
        font-weight: bold;
        padding-top: 1px;
        color: #fff;
        text-align: center;

        &.icon-badge {
            background: $theme-color-count;
            border: 2px solid #fff;
        }
    }
}

.app-notifications-dropdown {

    .dropdown-menu {
        width: 300px;

        .dropdown-menu-header {
            border-bottom: 1px solid $theme-border-color;
        }

        .dropdown-menu-title {
            font-size: 1rem;
        }

        .profile-image {
            width: 36px;
            height: 36px;
        }

        .info {
            padding-right: 80px;
            position: relative;
        }

        .meta {
            color: $theme-text-color-light;
            position: absolute;
            right: 0;
            top: 0;
            font-size: 0.75rem;

        }

        .dropdown-menu-footer {
            border-top: 1px solid $theme-border-color;
        }

        .item {
            min-width: 250px;
            position: relative;
            border-bottom: 1px solid $theme-border-color;

            &:last-child {
                border-bottom: none;
            }

            &:hover {
                background: $smoky-white;
            }
        }

        .link-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            display: block;
            left: 0;
            top: 0;
        }
    }

    .app-icon-holder {
        display: inline-block;
        background: lighten($theme-color-primary, 60%);
        color: $theme-color-primary;
        width: 36px;
        height: 36px;
        padding-top: 4px;
        font-size: 1rem;
        text-align: center;
        border-radius: 50%;

        &.icon-holder-mono {
            background: $theme-bg-light;
            color: $theme-text-color-light;
        }

        svg {
            width: 20px;
            height: 20px;
        }
    }
}

.app-user-dropdown {
    display: inline-block;

    a {

    }

    img {
        width: 36px;
        height: 36px;
    }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
    .app-notifications-dropdown .dropdown-menu {
        width: 400px;
    }

}


// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
    .app-header-inner {
        margin-left: 250px; //side panel width;
    }
}


// X-Small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) {
    .search-mobile-trigger {
        cursor: pointer;
        opacity: 0.8;

        &:hover {
            color: $theme-color-primary;
            opacity: 1;
        }

    }
    .app-search-box {
        display: none;
        position: absolute;
        left: 0;
        top: 56px;
        padding: 0;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        transition: all 0.4s ease-in-out;

        .app-search-form {
            .search-input {
                border-radius: 0;
                padding-top: 1.5rem;
                padding-bottom: 1.5rem;
            }

            .search-btn {
                top: 7px;
            }

        }

        &.is-visible {
            display: block;
        }
    }
}
</style>
