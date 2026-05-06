// sanity-studio/schemas/resumeApplication.js (Sanity Folder)
export default {
  name: 'resumeApplication',
  title: 'Resume Applications',
  type: 'document',
  fields: [
    {
      name: 'resume',
      title: 'Uploaded Resume',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    },
    {
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Review', value: 'reviewed' },
          { title: 'Matched', value: 'matched' }
        ],
        layout: 'radio'
      },
      initialValue: 'new'
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'resume.asset.originalFilename',
      subtitle: 'status'
    }
  }
}
