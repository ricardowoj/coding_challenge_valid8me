<script setup>
import V8Button from '@components/V8Button.vue';
import { BUTTON_TYPES, SIZES, TASK_STATUS } from '../utils/constants';
import { ref } from 'vue';

const emit = defineEmits(['completeTask']);

const props = defineProps({
    avatarUrl: {
        type: String
    },
    isAutomated: {
        type: Boolean,
        default: false
    },
    source: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    taskRef: {
        type: String,
        required: false
    },
    status: {
        type: [String, Number],
        validator: value => Object.values(TASK_STATUS).includes(value),
        required: true
    },
    hasActionMenu: {
        type: Boolean,
        default: true
    },
    disableAssignAction: {
        type: Boolean,
        default: false
    }
});

const CLASSES = {
    BASE: 'v8-task',
    AVATAR_CONTAINER: 'avatar-container',
    FALLBACK_AVATAR: 'fallback-avatar',
    TASK_CONTAINER: 'task-container',
    TASK_STATS: 'task-stats'
};

const TASK_CONFIG = {
    [TASK_STATUS.IN_PROGRESS]: {
        LABEL: 'In Progress',
        CLASS: 'in-progress'
    },
    [TASK_STATUS.COMPLETE]: {
        LABEL: 'Complete',
        CLASS: 'complete'
    }
};

let IS_IMAGE_VALID = ref(null);
const fetcherAvatarUrl = async () => {
  await fetch(props.avatarUrl)
};
fetcherAvatarUrl()
    .then(() => IS_IMAGE_VALID.value = true)
    .catch(() => IS_IMAGE_VALID.value = false)
</script>

<template>
    <article :class="[
        CLASSES.BASE,
        `is-status-${TASK_CONFIG[status].CLASS}`,
    ]">
        <section :class="[CLASSES.AVATAR_CONTAINER]">
            <div v-if="IS_IMAGE_VALID" :class="[CLASSES.FALLBACK_AVATAR]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <image ref="idImageAvagarUr2l" :href="avatarUrl" width="24"  height="24"/>
                </svg>
            </div>
            <div v-else :class="[CLASSES.FALLBACK_AVATAR]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path ref="idImageAvagarUrl"
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
        </section>
        <section :class="[CLASSES.TASK_CONTAINER]">
            <header>
                <h3>{{ isAutomated ? 'Automated' : source }}</h3>
                -
                <span>
                    {{ TASK_CONFIG[status].LABEL }}
                </span>
            </header>
            <main>
                <h4>
                    {{ title }}
                </h4>
                <p>
                    {{ message }}
                </p>
                <div v-if="taskRef" :class="[CLASSES.TASK_STATS]">
                    <template v-if="taskRef">
                        <strong>Task Ref: </strong> <span>{{ taskRef }}</span>
                    </template>
                </div>
                <footer v-if="status === TASK_STATUS.IN_PROGRESS">
                    <V8Button
                        :size="SIZES.SMALL"
                        :label="'Complete Task'"
                        :type="BUTTON_TYPES.SECONDARY"
                        :onClick="() => emit('completeTask')"
                    />
                </footer>
            </main>
        </section>
    </article>
</template>

<style scoped lang="scss">
article.v8-task {
    @include font-base;
    @include font-smoothing;
    cursor: pointer;
    display: flex;
    gap: 12px;
    width: 630px;
    padding: 0 24px;
    user-select: none;

    .avatar-container {
        display: flex;
        flex-direction: column;

        .fallback-avatar {
            width: 40px;
            height: 40px;
            background-color: var(--v8-colour-primary-200);
            color: var(--v8-colour-white);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .task-container {
        > header {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            margin-bottom: 6px;
            color: var(--v8-colour-grey-400);

            h3 {
                font-size: inherit;
                font-weight: 600;
                color: var(--v8-colour-grey-700);
                margin: 0;
            }
        }

        > main {
            box-sizing: border-box;
            width: 530px;
            font-size: 14px;
            background: var(--v8-colour-grey-050);
            border: 1px solid var(--v8-colour-grey-300);
            border-radius: 8px;
            padding: 16px;
            transition: border-color 0.1s ease, box-shadow 0.1s ease;
            @include v8-box-shadow-shadow-xs;

            h4 {
                display: flex;
                font-weight: 600;
                font-size: inherit;
                line-height: 22px;
                color: var(--v8-colour-grey-700);
                margin: 0;
            }

            p,
            .task-stats {
                color: var(--v8-colour-grey-500);
                margin: 0;
            }

            p {
                max-width: 410px;
            }

            .task-stats {
                font-size: 12px;
                margin-top: 12px;

                >strong {
                    font-weight: 500;

                    &:not(:first-child) {
                        margin-left: 6px;
                    }
                }
            }

            > footer {
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    &.is-status-complete {
        .task-sequence-status {
            --task-sequence-status-colour: var(--v8-colour-success-300);
        }

        .task-container {
            >header {
                span {
                    color: var(--v8-colour-success-500);
                }
            }

            >main {
                background: var(--v8-colour-success-025);
                border-color: var(--v8-colour-success-200);

                h4 {
                    color: var(--v8-colour-success-500);
                }
            }
        }
    }

    &:hover {
        main {
            border-color: var(--v8-colour-primary-400);
            @include task-hover-shadow(var(--v8-colour-primary-050));
        }

        &.is-status-complete {
            main {
                border-color: var(--v8-colour-success-200);
                @include task-hover-shadow(var(--v8-colour-success-050));
            }
        }
    }
}
</style>
