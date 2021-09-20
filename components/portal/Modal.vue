<template>
    <!-- Right Sidebar starts -->
    <div class="modal modal-slide-in fade" :id="modalId">
        <div class="modal-dialog sidebar-lg">
            <div class="modal-content p-0">
                <div class="modal-header align-items-center mb-1">
                    <h5 class="modal-title">{{modalTitle}}</h5>
                    <div class="todo-item-action d-flex align-items-center justify-content-between ms-auto">
                        <i class="bi bi-x-lg cursor-pointer" data-bs-dismiss="modal"></i>
                    </div>
                </div>
                <div class="modal-body flex-grow-1 pb-sm-0 pb-3">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
    <!-- Right Sidebar ends -->
</template>

<script>
export default {
    name: "modal",
    props:['modalTitle','modalId']
}
</script>

<style lang="scss" scoped>
@import "assets/scss/vars";
@import "assets/scss/mixins";
 //Modals

.modal {
    // Modal Header

    .modal-header {
        background-color: #f8f8f8;

        // close button
        .btn-close {
            padding: 0.8rem;
            box-shadow: 0 5px 20px 0 rgba(#22292f, 0.1);
            border-radius: 0.357rem;
            background-color: #f8f8f8;
            opacity: 1;
            transition: all 0.23s ease 0.1s;
            position: relative;
            transform: translate(18px, -10px);

            // For hover effect of close btn
            &:hover,
            &:focus,
            &:active {
                opacity: 1;
                outline: none;
                transform: translate(15px, -2px);
                box-shadow: none;
            }
        }
    }

    .modal-fullscreen {
        .modal-header {
            .btn-close {
                transform: translate(0, 0);
            }
        }
    }

    // Modal Content
    .modal-content {
        // overflow: unset; updated to "visible" as close icon is not visible in IE
        overflow: visible;
        box-shadow: 0 5px 20px 0 rgba(#22292f, 0.1);
    }

    .modal-footer {
        padding: 0.8rem 1.4rem;
    }

    // modal sticky for apps
    &.modal-sticky {
        bottom: 0;
        right: 0;
        top: auto;
        left: auto;
        height: auto;
        position: fixed;

        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .modal-dialog {
            margin-right: 20px !important;
            box-shadow: 0 0 24px 0 rgba(#22292f, 0.25);
            border-radius: 0.357rem;
        }

        .modal-actions {
            background: transparent;
            box-shadow: none;
            line-height: 0;
        }
    }
}

// Modal XS
.modal-xs {
    max-width: 300px;
}

// Modal XL
@media (min-width: 1200px) {
    .modal-xl {
        margin-left: 3%;
        margin-right: 3%;
    }
}

// Slide In Modal //
.modal-slide-in,
.modal-slide-in .modal {
    padding: 0 !important;
    overflow: hidden !important;
}

.modal-slide-in {
    .modal-dialog {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: auto;
        margin: 0;
        max-width: none;
        width: (25rem - 5);

        .modal-content {
            //padding-bottom: ($modal-title-line-height * $btn-close-width) + $modal-header-padding-y;
            //padding-top: ($modal-title-line-height * $btn-close-width) + $modal-header-padding-y;
            overflow: auto;
            border-radius: 0;
            height: 100%;
        }

        .modal-body {
            padding-bottom: 0;
            padding-top: 0;
            margin: auto 0;
            flex-grow: 0;
        }

        @media (min-width: (map-get($grid-breakpoints, sm))) {
            width: 28rem;
        }

        &.sidebar-sm {
            width: 25rem;
        }

        &.sidebar-lg {
            @media (min-width: (map-get($grid-breakpoints, sm))) {
                width: 30rem;
            }
        }
    }

    .btn-close {
        z-index: 10;
        position: absolute;
        top: 1.5rem;
        right: 1.4rem;
        margin: 0;
        padding: 0 !important;
        line-height: 0.5;
        transform: translate(0, -50%);
    }
}

// Slide from Right
.modal-slide-in.fade .modal-dialog,
.modal-slide-in .modal.fade .modal-dialog {
    transform: translateX(100%);
    transition: transform 0.1s ease-out;
}

.modal-slide-in.show .modal-dialog,
.modal-slide-in .modal.show .modal-dialog {
    transform: translateX(0) !important;
    transition: transform 0.1s ease-out;
}

// To remove Max-width of XS Modal in Small Screen

@media (max-width: 576px) {
    // Modals

    // Padding applied to the modal body
    $modal-inner-padding: 0.8rem 1.4rem !default;

    $modal-content-border-width: 0 !default;
    $modal-content-border-radius: 0.357rem !default;

    $modal-footer-border-width: 1px !default;
    $modal-footer-border-color: rgba(#22292f, 0.05) !default;

    $modal-header-padding-y: 0.8rem !default;
    $modal-header-padding-x: 1.4rem !default;

    $modal-sm: 400px !default;
    $modal-xl: 94% !default;

    //    Slide In Modal
    $modal-slide-in-width-sm: 25rem !default; // (c)
    $modal-slide-in-width: 28rem !default; // (c)
    $modal-slide-in-width-lg: 30rem !default; // (c)


    .modal {
        &:not(.modal-slide-in) {
            .modal-dialog:not(.modal-fullscreen) {
                padding-right: 1rem;
                padding-left: 1rem;
            }
        }

        .modal-xs,
        .modal-sm {
            max-width: unset;
        }

        &.modal-sticky .modal-dialog {
            margin-right: 0.2rem !important;
            margin-left: 0.2rem;
            margin-bottom: 3rem;
        }
    }
}


</style>
