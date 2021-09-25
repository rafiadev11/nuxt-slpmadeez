<template>
    <div id="app-sidepanel" class="app-sidepanel">
        <div id="sidepanel-drop" class="sidepanel-drop"></div>
        <div class="sidepanel-inner d-flex flex-column">
            <a href="#" id="sidepanel-close" class="sidepanel-close d-xl-none">&times;</a>
            <div class="app-branding">
                <NuxtLink to="/" class="app-logo">
                    <nuxt-img class="logo-icon me-2" src="/images/logo.png" alt="logo"/>
                    <span class="logo-text">PORTAL</span>
                </NuxtLink>

            </div>

            <nav id="app-nav-main" class="app-nav app-nav-main flex-grow-1">
                <ul class="app-menu list-unstyled accordion" id="menu-accordion">
                    <li class="nav-item">
                        <NuxtLink class="nav-link" to="/dashboard">
						        <span class="nav-icon">
						            <i class="bi bi-house-door"></i>
						         </span>
                            <span class="nav-link-text">Dashboard</span>
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link" to="#">
						        <span class="nav-icon">
                                    <i class="bi bi-calendar"></i>
						         </span>
                            <span class="nav-link-text">Calendar</span>
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link" to="#">
						        <span class="nav-icon">
						            <i class="bi bi-bar-chart"></i>
						         </span>
                            <span class="nav-link-text">Reports</span>
                        </NuxtLink>
                    </li>
                    <li>
                        <hr>
                    </li>
                    <li class="nav-item has-submenu">
                        <a class="nav-link submenu-toggle" href="#" data-bs-toggle="collapse"
                           data-bs-target="#submenu-1" aria-expanded="false" aria-controls="submenu-1">
						        <span class="nav-icon">
                                    <i class="bi bi-gear"></i>
                                </span>
                            <span class="nav-link-text">Management</span>
                            <span class="submenu-arrow">
                                <i class="bi bi-chevron-down"></i>
                            </span>
                        </a>
                        <div id="submenu-1" class="collapse submenu submenu-1" data-bs-parent="#menu-accordion">
                            <ul class="submenu-list list-unstyled">
                                <li class="submenu-item">
                                    <NuxtLink class="submenu-link" to="/manage/schools">Schools</NuxtLink>
                                </li>
                                <li class="submenu-item">
                                    <NuxtLink class="submenu-link" to="/manage/school-years">School Years</NuxtLink>
                                </li>
                                <li class="submenu-item">
                                    <NuxtLink class="submenu-link" to="/manage/disorders">Disorders</NuxtLink>
                                </li>
                                <li class="submenu-item">
                                    <NuxtLink class="submenu-link" to="/manage/students">Students</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>

        </div>
    </div>
</template>

<script>
export default {
    name: "TopNav"
}
</script>

<style lang="scss" scoped>
@import "assets/scss/vars";
@import "assets/scss/mixins";

.app-sidepanel {
    position: fixed;
    min-height: 100vh;
    height: 100%;
    left: 0;
    top: 0;
    font-size: 0.875rem;
    border-right: 1px solid $theme-border-color;

    .panel-drop {
        display: none;
    }

    .sidepanel-inner {
        position: relative;
        z-index: 10;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.05) 0 8px 15px;
        width: 250px;
        height: 100%;

    }

    .sidepanel-close {
        display: none;
        position: absolute;
        z-index: 20;
        right: -2rem;
        top: 0;
        color: #fff;
        font-size: 2rem;
    }

    &.sidepanel-hidden {
        left: -400px; //value >= 250px (sidepanel width + close button width)

    }

    &.sidepanel-visible {
        left: 0;
    }

    .app-nav-main {
        overflow-y: auto;
        /* Firefox scrollbar */
        scrollbar-color: rgba(0, 0, 0, 0.1) $theme-border-color;
        scrollbar-width: thin;

        /* Chrome webkit scrollbar */

        &::-webkit-scrollbar {
            width: 6px;
            background-color: $theme-border-color;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
        }
    }
}


.app-branding {
    height: 60px; //same as .app-header
    padding-top: 1rem;
    padding-left: 1rem;
    margin-bottom: 1rem;

    .logo-icon {
        width: 36px;
        height: 36px;
    }

    .logo-text {
        color: $theme-text-color-primary;
        font-size: 1.25rem;
        font-weight: 600;
        vertical-align: middle;
    }
}

.app-nav {
    color: $theme-text-color-secondary;
    display: block;
    padding: 0;
    width: 100%;

    .app-menu {
        margin-bottom: 0;
    }

    .nav-item {
        display: block;
        color: $theme-text-color-secondary;
        background: #fff;
    }

    .nav-link {
        display: block;
        color: $theme-text-color-primary;
        position: relative;
        padding: 0.875rem 1rem 0.875rem 3rem;
        border-left: 3px solid transparent;

        &.active {
            color: $theme-color-primary;
            background: lighten($theme-color-primary, 60%);
            border-left: 3px solid $theme-color-primary;
            font-weight: 500;
        }

        &.submenu-toggle.active {
            background: none;
            border-color: transparent;
        }


        &:hover {
            color: $theme-color-primary;
        }
    }

    .nav-icon {
        position: absolute;
        left: 1rem;
        top: 0.7rem;

        .bi {
            width: 1.25rem;
            height: 1.25rem;
        }
    }

    .submenu-arrow {
        position: absolute;
        right: 1rem;
        top: 0.7rem;
        color: $theme-text-color-light;

        svg {
            width: 14px;
            height: 14px;

        }

    }

    .submenu-toggle {

        transition: all 0.4s ease-in-out;

        &[aria-expanded="true"] {


            .submenu-arrow {
                color: $theme-text-color-primary;

                svg {
                    -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
                    transform: rotate(180deg);
                    -webkit-transform: rotate(180deg);
                }
            }

        }
    }

    .submenu {

    }

    .submenu-item {
        margin-bottom: 0;

    }

    .submenu-link {

        color: $theme-text-color-secondary;
        font-size: 0.875rem;
        margin-left: 2rem;
        padding: 0.5rem 1rem;
        position: relative;
        display: block;
        margin-bottom: 0;

        &:before {
            background-color: $theme-border-color;
            content: " ";
            display: inline-block;
            left: 0;
            position: absolute;
            width: 2px;
            height: 100%;
            margin-top: -0.5rem;
        }

        &:hover {
            color: $theme-text-color-primary;
        }

        &.active {
            color: $theme-color-primary;

            &:before {
                background-color: $theme-color-primary;
            }
        }

    }
}

.app-sidepanel-footer {
    //position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    border-top: 1px solid $theme-border-color;
    background: $theme-bg-light;

    .app-nav-footer {
        margin-bottom: 0;
    }

}


// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) {

    .app-sidepanel {
        transition: all 0.4s ease-in-out;
        left: -400px; //value >= 250px (sidepanel width + close button width)
        &.sidepanel-visible {
            display: block;
        }
    }
    .sidepanel-visible .sidepanel-close {
        display: inline-block; //prevent showing the panel close button in xl screen
    }
    .sidepanel-visible .sidepanel-drop {
        position: fixed;
        display: block;
        min-height: 100vh;
        height: 100%;
        width: 100%;
        min-width: 100vw;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.35);

    }
}
</style>
