import material from '@js/store/modules/material'

describe('getters test', () => {
  test('isDisabledReloadButton', () => {
    const { isDisabledReloadButton } = material.getters
    let mockState = {
      material: {
        url_student: 'https://example.com'
      },
      materialTab: '',
      buttons: {
        reloadMaterial: {
          disabled: false
        }
      }
    }
    expect(isDisabledReloadButton(mockState)).toBeFalsy()

    mockState = {
      material: {
        url_student: ''
      },
      materialTab: '',
      buttons: {
        reloadMaterial: {
          disabled: false
        }
      }
    }
    expect(isDisabledReloadButton(mockState)).toBeTruthy()

    mockState = {
      material: {
        url_student: 'https://example.com'
      },
      materialTab: 'select',
      buttons: {
        reloadMaterial: {
          disabled: false
        }
      }
    }
    expect(isDisabledReloadButton(mockState)).toBeTruthy()

    mockState = {
      material: {
        url_student: 'https://example.com'
      },
      materialTab: '',
      buttons: {
        reloadMaterial: {
          disabled: true
        }
      }
    }
    expect(isDisabledReloadButton(mockState)).toBeTruthy()
  })

  test('isDisabledOpenMaterialWindowButton', () => {
    const { isDisabledOpenMaterialWindowButton } = material.getters
    let mockState = {
      material: {
        url_student: 'https://example.com'
      },
      materialTab: '',
      buttons: {
        openMaterialWindow: {
          disabled: false
        }
      }
    }
    expect(isDisabledOpenMaterialWindowButton(mockState)).toBeFalsy()

    mockState = {
      material: {
        url_student: ''
      },
      materialTab: '',
      buttons: {
        openMaterialWindow: {
          disabled: false
        }
      }
    }
    expect(isDisabledOpenMaterialWindowButton(mockState)).toBeTruthy()

    let mockState = {
      material: {
        url_student: 'https://example.com'
      },
      materialTab: 'select',
      buttons: {
        openMaterialWindow: {
          disabled: false
        }
      }
    }
    expect(isDisabledOpenMaterialWindowButton(mockState)).toBeTruthy()

    let mockState = {
      material: {
        url_student: 'https://example.com'
      },
      materialTab: '',
      buttons: {
        openMaterialWindow: {
          disabled: true
        }
      }
    }
    expect(isDisabledOpenMaterialWindowButton(mockState)).toBeTruthy()
  })
})

describe('actions test', () => {
  test('searchMaterialByMaterialUrl', async () => {
    const { searchMaterialByMaterialUrl } = material.actions
    const mockState = {
      materialList: [
        {
          material_list: [
            {
              id: '1',
              url_student: 'https://example.com',
              url_tutor: 'https://tutor.example.com'
            }
          ]
        }
      ]
    }
    await expect(
      searchMaterialByMaterialUrl({ state: mockState }, 'https://example.com')
    ).resolves.toEqual(mockState.materialList[0].material_list[0])
    await expect(
      searchMaterialByMaterialUrl({ state: mockState }, 'https://google.com')
    ).resolves.toBeFalsy()
  })
})
