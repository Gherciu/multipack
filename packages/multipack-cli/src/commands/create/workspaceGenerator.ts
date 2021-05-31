import path from 'path'
import { Generator } from '../../../types'
import getTemplatesDirPath from '../../utils/getTemplatesDirPath'

/* istanbul ignore next */
const workspaceGenerator: Generator = {
  prompts: [
    {
      type: 'input',
      name: 'workspaceName',
      required: true,
      message: 'Workspace name (e.g, my-workspace)',
    },
    {
      type: 'input',
      name: 'workspaceDescription',
      required: true,
      message: 'Workspace description (e.g, Enjoyable workspace)',
    },
    {
      type: 'input',
      name: 'organizationName',
      required: true,
      message: 'Organization name (e.g, my-organization)',
    },
  ],
  actions: answers => {
    const newWorkspaceDir = path.join(process.cwd(), answers.workspaceName)
    return [
      {
        type: 'copy',
        files: {
          [path.join(getTemplatesDirPath(), '/create/workspace/')]:
            newWorkspaceDir,
        },
      },
      {
        type: 'transform',
        files: path.join(newWorkspaceDir, '/*'),
        data: answers,
      },
      {
        type: 'rename',
        files: {
          [path.join(newWorkspaceDir, '_gitignore')]: path.join(
            newWorkspaceDir,
            '.gitignore',
          ),
        },
      },
    ]
  },
}

export default workspaceGenerator
