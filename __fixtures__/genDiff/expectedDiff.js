const EXPECTED_DIFF_STYLISH = 
`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const EXPECTED_DIFF_PLAIN = 
`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const EXPECTED_DIFF_JSON = 
`{
  "common": {
    "type": "nested",
    "children": {
      "follow": {
        "type": "added",
        "value": false
      },
      "setting1": {
        "type": "unchanged",
        "value": "Value 1"
      },
      "setting2": {
        "type": "removed",
        "value": 200
      },
      "setting3": {
        "type": "updated",
        "prevValue": true,
        "newValue": null
      },
      "setting4": {
        "type": "added",
        "value": "blah blah"
      },
      "setting5": {
        "type": "added",
        "value": {
          "key5": "value5"
        }
      },
      "setting6": {
        "type": "nested",
        "children": {
          "doge": {
            "type": "nested",
            "children": {
              "wow": {
                "type": "updated",
                "prevValue": "",
                "newValue": "so much"
              }
            }
          },
          "key": {
            "type": "unchanged",
            "value": "value"
          },
          "ops": {
            "type": "added",
            "value": "vops"
          }
        }
      }
    }
  },
  "group1": {
    "type": "nested",
    "children": {
      "baz": {
        "type": "updated",
        "prevValue": "bas",
        "newValue": "bars"
      },
      "foo": {
        "type": "unchanged",
        "value": "bar"
      },
      "nest": {
        "type": "updated",
        "prevValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    }
  },
  "group2": {
    "type": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  "group3": {
    "type": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
}`;

export { EXPECTED_DIFF_STYLISH, EXPECTED_DIFF_PLAIN, EXPECTED_DIFF_JSON } ;