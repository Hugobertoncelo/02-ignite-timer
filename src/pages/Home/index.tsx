import { HandPalm, Play } from "phosphor-react"
import { FormProvider, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' 
import * as zod from 'zod'
import { useContext } from "react"

import { 
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton, 
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown} from './components/Countdown'
import { CyclesContext } from "../../contexts/CyclesContext"

const newCycleFromValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5,'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no mínimo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFromValidationSchema>

export function Home() {
    const { activeCycle, createNewCycle, InterruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFromValidationSchema),
        defaultValues: {
            task:'',
            minutesAmount: 0,
        },
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer> 
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={InterruptCurrentCycle} type='button'>
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}