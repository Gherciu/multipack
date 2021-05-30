import runPrompts from './runPrompts'
import runActions from './runActions'
import { TRunGenerator } from '../../types'

/**
 *  Used to run generators
 * @param generator - generator
 */
/* istanbul ignore next */
const runGenerator: TRunGenerator = async generator => {
  let answers = {}

  if (generator.prompts) {
    answers = await runPrompts(generator.prompts)
  }

  const generatorActions =
    typeof generator.actions === 'function'
      ? generator.actions(answers)
      : generator.actions

  await runActions(generatorActions)
}

export default runGenerator
