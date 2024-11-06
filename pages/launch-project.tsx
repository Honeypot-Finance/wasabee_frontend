import Confirm from '@/components/LBPFormItems/Confirm'
import CreateAndBranding from '@/components/LBPFormItems/CreateAndBranding'
import ProjectInfo from '@/components/LBPFormItems/ProjectInfo'
import Review from '@/components/LBPFormItems/Review'
import SalesStructure from '@/components/LBPFormItems/SalesStructure'
import SocialsAndCommunity from '@/components/LBPFormItems/SocialsAndCommunity'
import TermsConditions from '@/components/LBPFormItems/TermsConditions'
import TokenomicsAndPreview from '@/components/LBPFormItems/TokenomicsAndPreview'
import TokenVesting from '@/components/LBPFormItems/TokenVesting'
import Stepper from '@/components/Stepper'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const StepsData = [
  {
    key: '1',
    title: 'Creation & Branding',
    isActive: true,
    isValidated: true,
  },
  {
    key: '2',
    title: 'Sales Structure',
    isActive: true,
    isValidated: false,
  },{
    key: '3',
    title: 'Tokenomics & Preview',
    isActive: false,
    isValidated: false,
  },{
    key: '4',
    title: 'Token Vesting',
    isActive: false,
    isValidated: false,
  },{
    key: '5',
    title: 'Project Info',
    isActive: false,
    isValidated: false,
  },{
    key: '6',
    title: 'Socials & Community',
    isActive: false,
    isValidated: false,
  },{
    key: '7',
    title: 'Review',
    isActive: false,
    isValidated: false,
  },{
    key: '8',
    title: 'Terms & Conditions',
    isActive: false,
    isValidated: false,
  },{
    key: '9',
    title: 'Confirm',
    isActive: false,
    isValidated: false,
  },
]

const LaunchProject = () => {

  const [activeTab, setActiveTab] = useState('9')

  const methods = useForm({
    
  })

  const CurrentStep = () => {
    switch (activeTab) {
      case '1':
        return <CreateAndBranding/>
      case '2':
        return <SalesStructure/>
      case '3':
        return <TokenomicsAndPreview/>
      case '4':
        return <TokenVesting/>
      case '5':
        return <ProjectInfo/>
      case '6':
        return <SocialsAndCommunity/>
      case '7':
        return <Review/>
      case '8':
        return <TermsConditions/>
      case '9':
        return <Confirm/>
      default:
        return <div/>
    }
  }

  return (
    <div className='md:p-6  md:max-w-full xl:max-w-[1440px] mx-auto mb-[30vh] flex'>
      <div className='flex-[0.35] bg-[#271A0C] py-[60px] rounded-[28px] justify-center'>
        <Stepper data={StepsData} />
      </div>
      <div className='flex-[0.65] py-20 pl-9'>
        <FormProvider {...methods} >
          <CurrentStep/>
        </FormProvider>
      </div>
    </div>
  )
}

export default LaunchProject