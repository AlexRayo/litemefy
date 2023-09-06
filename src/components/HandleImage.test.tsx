import React, { useRef, useState } from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ImageUpload from './ImageUpload'
import HandleImage from './HandleImage'
import jsdom from 'jsdom';

const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
globalThis.document = dom.window.document;
globalThis.window = dom.window;

describe("First test", () => {
  test("first test", () => {
    render(<HandleImage />)
  })
})