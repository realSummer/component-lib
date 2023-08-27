
// 表单参数
export const formConfig = [
  {
    id: 2,
    propName: 'mediaPlatformCode',
    type: 'avl-input', //  标识属于哪种form组件
    width: '50%',
    label: '媒体平台:',
    labelWidth: '180px',
    defaultValue: '' //  默认值
  },
  {
    id: 3,
    propName: 'mediaAccountId',
    type: 'avl-input', //  标识属于哪种form组件
    width: '50%',
    label: '媒体账户ID:',
    labelWidth: '180px',
    linkValueProps: ['mediaPlatformCode'],
    changeValue(data) {
      console.log(data)
      if (!+data[0].mediaPlatformCode) {
        return 0
      }
      return +data[0].mediaPlatformCode + 10
    },
    defaultValue: '' //  默认值
  },
  {
    id: 4,
    propName: 'mediaAccountName',
    type: 'avl-select', //  标识属于哪种form组件
    label: '媒体账户名称:',
    width: '50%',
    labelWidth: '180px',
    defaultValue: '', //  默认值
    defaultOptions: [
      {
        label: '武汉',
        value: 'wuhan'
      },
      {
        label: '上海',
        value: 'shanghai'
      }
    ],
    linkOptionsProps: ['mediaPlatformCode'],
    changeOptions: (data) => {
      if (+data[0].mediaPlatformCode === 1) {
        return [
          {
            label: '武汉1',
            value: 'wuhan1'
          },
          {
            label: '上海1',
            value: 'shanghai1'
          }
        ]
      } else {
        return [
          {
            label: '武汉2',
            value: 'wuhan2'
          },
          {
            label: '上海2',
            value: 'shanghai2'
          }
        ]
      }
    }
  },
  {
    id: 5,
    propName: 'platformAdvancePayment',
    type: 'avl-text', //  标识属于哪种form组件
    width: '50%',
    label: `预收款余额`,
    labelWidth: '180px',
    defaultValue: 0 //  默认值
  },
  {
    id: 6,
    propName: 'advertiserName',
    type: 'avl-text', //  标识属于哪种form组件
    width: '50%',
    label: '广告主:',
    labelWidth: '180px',
    defaultValue: '' //  默认值
  },
  {
    id: 7,
    propName: 'productName',
    type: 'avl-text', //  标识属于哪种form组件
    width: '50%',
    label: '产品名称:',
    labelWidth: '180px',
    defaultValue: '' //  默认值
  },
  {
    id: 8,
    propName: 'totalRechargePoint',
    type: 'avl-text', //  标识属于哪种form组件
    width: '50%',
    label: '总充值点数:',
    labelWidth: '180px',
    defaultValue: 0 //  默认值
  }
]
