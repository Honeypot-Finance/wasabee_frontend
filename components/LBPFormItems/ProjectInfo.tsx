import { Select, SelectItem, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import SelectField from './Components/SelectField'
import clsx from 'clsx'
import InputField from './Components/InputField'
import { Button } from '../button'

type Props = {}

const ProjectCategory = [
  {
    key: "gaming",
    label: "Gaming"
  },
  {
    key: "crypto",
    label: "Crypto"
  },
  {
    key: "finance",
    label: "Finance"
  }
]

const ProjectInfo = () => {

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>("edit")

  const handleTabChange = (tab: 'edit' | 'preview') => {
    setActiveTab(tab)
  }

  return (
    <div>
       <div className='font-medium'>
        <div className='text-xl leading-[26px]'>Project Infomation</div>
        <div className='text-[12px] leading-4 text-white/50'>Please Fill out Sale details.</div>
      </div>
      <div className='flex flex-col gap-9 mt-9'>
        <div>
          <div className='text-base leading-5 font-medium'>Category</div>
          <SelectField items={ProjectCategory}>
            {ProjectCategory.map(projectCategory => <SelectItem key={projectCategory.key}>{projectCategory.label}</SelectItem>)}
          </SelectField>
        </div>
        <div>
          <div className='text-base leading-5 font-medium'>LBP Description</div>
          <div className='text-[12px] leading-4 font-medium text-white/50 mt-[6px]'>Markdown support.</div>
          <div className='flex flex-col gap-2 mt-2'>
            <div className='flex bg-[#3E2A0FC4] w-fit rounded-xl'>
              <div onClick={() => handleTabChange('edit')} className={clsx('py-[10px] px-[25px] cursor-pointer rounded-s-xl text-base leading-5', {
                "bg-[#865215]": activeTab == 'edit',
                "outline outline-1 -outline-offset-1 outline-[#865215]": activeTab == 'preview'
              })}>Edit</div>
              <div onClick={() => handleTabChange('preview')} className={clsx('py-[10px] px-[25px] cursor-pointer  rounded-e-xl  text-base leading-5', {
                "bg-[#865215] ": activeTab == 'preview',
                "outline -outline-offset-1 outline-1 outline-[#865215]": activeTab == 'edit'
                })}>Preview</div>
            </div>
            {activeTab === 'edit' &&
            <>
             <Textarea classNames={{
                inputWrapper: "bg-[#3E2A0FC4] data-[hover=true]:bg-[#3E2A0FC4] group-data-[focus=true]:bg-[#3E2A0FC4] border border-[#F7931AA8]"
                }}
                minRows={5}
              />
            <div className='text-[12px] text-white/50 leading-4'>13/5000</div>
            </>
            }
          </div>
        </div>
        <div>
          <div className='text-base leading-5 font-medium'>Links</div>
          <div className='text-[12px] leading-4 font-medium text-white/50 mt-[6px]'>Main Link*</div>
          <InputField />
        </div>
        <div>
          <div className='flex items-center gap-[18px]'>
            <div className='text-base leading-5 font-medium'>Geo-blocked Countries</div>
            <Button styleMode='plain' className='outline-0 border-0 rounded-full h-[40px]'>
              <span className='text-lg leading-5 font-extrabold'>+ ADD</span>
            </Button>
          </div>
          <div className='py-[10px] px-[14px] border border-[#F7931AA8] rounded-xl bg-[#3E2A0FC4] flex flex-wrap gap-2 mt-2'>
            <Button styleMode='plain' className='outline-0 border-0 rounded-full h-[40px]'>
              <span className='text-sm  font-normal'>Afghanistan</span>
            </Button>
            <Button styleMode='plain' className='outline-0 border-0 rounded-full h-[40px]'>
              <span className='text-sm  font-normal'>Congo, The Democratic Republic of the </span>
            </Button>
            <Button styleMode='plain' className='outline-0 border-0 rounded-full h-[40px]'>
              <span className='text-sm  font-normal'>Korea,Democratic People"S Republic of</span>
            </Button>
          </div>
        </div>
        <div>
          <div className='flex items-center gap-[18px]'>
            <div className='text-base leading-5 font-medium'>Previous Investment Round Details</div>
            <Button styleMode='plain' className='outline-0 border-0 rounded-full h-[40px]'>
              <span className='text-lg leading-5 font-extrabold'>+ Add Round</span>
            </Button>
          </div>
          <div className='mt-3'>
            <div className='flex flex-col gap-2'>
              <div className='text-base leading-5 font-medium'>Round 1</div>
              <div className='flex gap-10'>
                <InputField label='Raise Amount' placeholder='0'/>
                <InputField label='Valuation Of Round' placeholder='0'/>
              </div>
              <div className='flex gap-10'>
                <InputField label='Raise Amount' placeholder='0'/>
                <InputField label='Valuation Of Round' placeholder='0'/>
              </div>
              <div className='flex gap-10'>
                <div className='flex-1'>
                  <InputField label='Raise Amount' placeholder='0'/>
                </div>
                <div className='flex-1'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-9 mt-[50px]'>
        <Button className='outline-0 border-0 '>Back</Button>
        <Button className='outline-0 border-0 '>Continue to Socials & Community</Button>
      </div>
    </div>
  )
}

export default ProjectInfo