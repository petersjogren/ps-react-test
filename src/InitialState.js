import uuidv4 from "uuid/v4";

export const invalidMousePosition = 999999;

function nodeTemplates() {
  return [
    {
      nodeConfirmedInSessionWithID: "0",
      title: "Add",
      id: 213,
      position: {
        x: 186,
        y: 7
      },
      isSelected: false,
      width: 120,
      inputPorts: [
        { name: "a", type: "int" },
        { name: "b", type: "int" }
      ],
      outputPorts: [{ name: "sum", type: "int" }]
    },
    {
      nodeConfirmedInSessionWithID: "0",
      title: "Mult",
      id: 213,
      position: {
        x: 186,
        y: 7
      },
      isSelected: false,
      width: 180,
      inputPorts: [
        { name: "x", type: "int" },
        { name: "y", type: "int" },
        { name: "z", type: "int" }
      ],
      outputPorts: [{ name: "sum", type: "int" }]
    },
    {
      nodeConfirmedInSessionWithID: "0",
      title: "Sub",
      id: 213,
      position: {
        x: 186,
        y: 7
      },
      isSelected: false,
      width: 100,
      inputPorts: [
        { name: "x", type: "int" },
        { name: "y", type: "int" }
      ],
      outputPorts: [{ name: "sum", type: "int" }]
    },
    {
      nodeConfirmedInSessionWithID: "0",
      title: "Div",
      id: 213,
      position: {
        x: 186,
        y: 7
      },
      isSelected: false,
      width: 120,
      inputPorts: [
        { name: "x", type: "int" },
        { name: "y", type: "int" }
      ],
      outputPorts: [{ name: "sum", type: "int" }]
    },
    {
      nodeConfirmedInSessionWithID: "0",
      title: "Add/Sub 4",
      id: 213,
      position: {
        x: 186,
        y: 7
      },
      isSelected: false,
      width: 120,
      inputPorts: [
        { name: "x", type: "int" },
        { name: "y", type: "int" },
        { name: "z", type: "int" },
        { name: "w", type: "int" }
      ],
      outputPorts: [
        { name: "sum", type: "int" },
        { name: "diff", type: "int" }
      ]
    }
  ];
}

function InitialStateStressTest() {
  var someIndexes = [...Array(202).keys()];
  var someNodes = someIndexes.map(index => {
    return {
      nodeConfirmedInSessionWithID: "0",
      title: "Add",
      id: uuidv4(),
      position: {
        x: 600 + 500 * Math.cos(((2 * 3.14) / someIndexes.length) * index),
        y: 600 + 500 * Math.sin(((2 * 3.14) / someIndexes.length) * index)
      },
      width: 120,
      isSelected: false,
      inputPorts: [
        { name: "x", type: "int" },
        { name: "y", type: "int" }
      ],
      outputPorts: [{ name: "sum", type: "int" }]
    };
  });

  var someConnections = someIndexes
    .filter(a => a % 2 === 0)
    .map(index => {
      return {
        isSelected: false,
        from: {
          nodeIndex: (index + someIndexes.length / 2 + 2) % someIndexes.length,
          index: 0
        },
        to: {
          nodeIndex: index,
          index: 0
        }
      };
    });

  return {
    currentSessionID: "9999",
    pureHTMLgraph: true,
    scale: 0.4,
    stressTest: true,
    isDragInProgress: false,
    dragPayload: {},
    dragMousePosition: { x: invalidMousePosition, y: invalidMousePosition },
    nodeTemplates: nodeTemplates(),
    nodes: [...someNodes],
    connections: [...someConnections],
    textNode: {
      x: -500,
      y: -350,
      width: 200,
      height: 400,
      text: `Over hill, over dale, Thorough bush, thorough brier, Over park,
            over pale, Thorough flood, thorough fire! I do wander everywhere,
            Swifter than the moon's sphere; And I serve the Fairy Queen, To
            dew her orbs upon the green; The cowslips tall her pensioners be;
            In their gold coats spots you see; Those be rubies, fairy favours;
            In those freckles live their savours; I must go seek some dewdrops
            here, And hang a pearl in every cowslip's ear.`
    },
    imgNode: {
      x: 50,
      y: -350,
      width: 400,
      height: 300,
      url: "http://minerva-central.net/images/minerva-forward-m1.png"
    }
  };
}

function InitialStateNormal() {
  return {
    currentSessionID: "9999",
    pureHTMLgraph: true,
    stressTest: false,
    scale: 0.9,
    isDragInProgress: false,
    dragPayload: {},
    dragMousePosition: { x: invalidMousePosition, y: invalidMousePosition },
    nodeTemplates: nodeTemplates(),
    nodes: [
      {
        nodeConfirmedInSessionWithID: "c5e9a331-66b4-4461-8f3f-d319fa838195",
        title: "Add",
        id: "0523c8bf-d17e-49a5-918b-a91bca1b4ee9",
        position: {
          x: 84.44444444444466,
          y: 28.888888888889323
        },
        isSelected: false,
        width: 120,
        inputPorts: [
          {
            name: "a",
            type: "int"
          },
          {
            name: "b",
            type: "int"
          }
        ],
        outputPorts: [
          {
            name: "sum",
            type: "int"
          }
        ]
      },
      {
        nodeConfirmedInSessionWithID: "c5e9a331-66b4-4461-8f3f-d319fa838195",
        title: "Add",
        id: "02bf0700-c984-452e-b3c2-82de39114955",
        position: {
          x: 507.7777777777772,
          y: 231.1111111111114
        },
        isSelected: false,
        width: 120,
        inputPorts: [
          {
            name: "a",
            type: "int"
          },
          {
            name: "b",
            type: "int"
          }
        ],
        outputPorts: [
          {
            name: "sum",
            type: "int"
          }
        ]
      },
      {
        nodeConfirmedInSessionWithID: "c5e9a331-66b4-4461-8f3f-d319fa838195",
        title: "Sub",
        id: "44eeef82-abfe-4070-9f72-e854dd325991",
        position: {
          x: 80.00000000000003,
          y: 165.55555555555566
        },
        isSelected: false,
        width: 100,
        inputPorts: [
          {
            name: "x",
            type: "int"
          },
          {
            name: "y",
            type: "int"
          }
        ],
        outputPorts: [
          {
            name: "sum",
            type: "int"
          }
        ]
      },
      {
        nodeConfirmedInSessionWithID: "c5e9a331-66b4-4461-8f3f-d319fa838195",
        title: "Add/Sub 4",
        id: "3c753071-65f6-4fbe-9bf1-2d861c6186ca",
        position: {
          x: 293.33333333333286,
          y: 231.11111111111128
        },
        isSelected: false,
        width: 120,
        inputPorts: [
          {
            name: "x",
            type: "int"
          },
          {
            name: "y",
            type: "int"
          },
          {
            name: "z",
            type: "int"
          },
          {
            name: "w",
            type: "int"
          }
        ],
        outputPorts: [
          {
            name: "sum",
            type: "int"
          },
          {
            name: "diff",
            type: "int"
          }
        ]
      },
      {
        nodeConfirmedInSessionWithID: "c5e9a331-66b4-4461-8f3f-d319fa838195",
        title: "Mult",
        id: "0da44ac8-acab-47cd-b195-29e11008c869",
        position: {
          x: 435.5555555555551,
          y: 73.33333333333347
        },
        isSelected: false,
        width: 180,
        inputPorts: [
          {
            name: "x",
            type: "int"
          },
          {
            name: "y",
            type: "int"
          },
          {
            name: "z",
            type: "int"
          }
        ],
        outputPorts: [
          {
            name: "sum",
            type: "int"
          }
        ]
      }
    ],
    connections: [
      {
        isSelected: false,
        from: {
          nodeIndex: 3,
          index: 0
        },
        to: {
          nodeIndex: 1,
          index: 0
        }
      },
      {
        isSelected: false,
        from: {
          nodeIndex: 2,
          index: 0
        },
        to: {
          nodeIndex: 3,
          index: 1
        }
      },
      {
        isSelected: false,
        from: {
          nodeIndex: 0,
          index: 0
        },
        to: {
          nodeIndex: 4,
          index: 1
        }
      },
      {
        isSelected: false,
        from: {
          nodeIndex: 2,
          index: 0
        },
        to: {
          nodeIndex: 4,
          index: 2
        }
      }
    ],
    textNode: {
      x: 500,
      y: 350,
      width: 200,
      height: 400,
      text: `Over hill, over dale, Thorough bush, thorough brier, Over park,
            over pale, Thorough flood, thorough fire! I do wander everywhere,
            Swifter than the moon's sphere; And I serve the Fairy Queen, To
            dew her orbs upon the green; The cowslips tall her pensioners be;
            In their gold coats spots you see; Those be rubies, fairy favours;
            In those freckles live their savours; I must go seek some dewdrops
            here, And hang a pearl in every cowslip's ear.`
    },
    imgNode: {
      x: 50,
      y: 350,
      width: 400,
      height: 300,
      url: "http://minerva-central.net/images/minerva-forward-m1.png"
    }
  };
}

export default function InitialState(stressTest) {
  if (stressTest) {
    return InitialStateStressTest();
  } else {
    return InitialStateNormal();
  }
}
