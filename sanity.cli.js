import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECTID,
    dataset: process.env.SANITY_STUDIO_DATASET
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {
    appId: 'e4v1ip1f9z6f11ewrh9qwfsc',
    autoUpdates: true,
  },
})
