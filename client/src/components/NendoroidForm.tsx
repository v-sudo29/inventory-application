import React from 'react'
import { 
  Button,
  HStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
  Textarea
 } from "@chakra-ui/react"

import { Form } from 'react-router-dom'

type StylesObj = {[key: string] : string}

interface NendoroidForm {
  formStyles: StylesObj,
  nameRef: React.RefObject<HTMLInputElement>,
  priceRef: React.RefObject<HTMLInputElement>,
  descriptionRef: React.RefObject<HTMLTextAreaElement>,
  imageUrlRef: React.RefObject<HTMLInputElement>,
  nameError: boolean,
  priceError: boolean,
  descriptionError: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  setFileData: React.Dispatch<React.SetStateAction<File | null>>
}

export default function NendoroidForm({
  formStyles, 
  nameRef, 
  priceRef,
  descriptionRef,
  imageUrlRef,
  nameError,
  priceError,
  descriptionError,
  handleSubmit,
  setFileData
} : Partial<NendoroidForm>) {
  return (
    <Form style={formStyles as React.CSSProperties} onSubmit={handleSubmit}> 

        <FormControl>
          {/* NAME, PRICE */}
          <FormLabel>Name</FormLabel>
          <Input mb='1rem' ref={nameRef} type='text' name='name'/>
          {nameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
          <HStack w='100%'>
            <VStack w='100%' align='start'>
              <FormLabel>Price</FormLabel>
              <NumberInput w='100%' ref={priceRef} precision={2} name='price'>
                <NumberInputField />
              </NumberInput>
            </VStack>
            <VStack w='100%' align='start'>
              <FormLabel>Units</FormLabel>
              <NumberInput w='100%' max={500} min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
          </HStack>
          {priceError && <FormErrorMessage>Price is required.</FormErrorMessage>}

          {/* DESCRIPTION, FILE */}
          <FormLabel>Description</FormLabel>
          <Textarea
            ref={descriptionRef}
            placeholder="Enter a detailed description for Nendoroid..."
            name='description'
            h='null'
            minH='0'
            rows={10}
            resize='none'
          />
          {descriptionError && <FormErrorMessage>Description is required.</FormErrorMessage>}
          <Input 
            ref={imageUrlRef} 
            type='file' 
            name='imageUrl'
            border='transparent'
            p='0rem'
            pt='0.2rem'
            mt='1rem'
            onChange={(e) => e.target.files && setFileData && setFileData(e.target.files[0])} 
          />
        </FormControl>

        <Button type="submit">Create</Button>

      </Form>
  )
}
