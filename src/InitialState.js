function InitialStateStressTest() {
  var someIndexes = [...Array(202).keys()];
  var someNodes = someIndexes.map(index => {
    return {
      title: "Add",
      id: 1000 + index,
      position: {
        x: 0 + 500 * Math.cos(((2 * 3.14) / someIndexes.length) * index),
        y: 400 + 500 * Math.sin(((2 * 3.14) / someIndexes.length) * index)
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
    pureHTMLgraph: true,
    scale: 0.4,
    stressTest: true,
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
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
    pureHTMLgraph: true,
    stressTest: false,
    scale: 0.9,
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    nodes: [
      {
        title: "Add",
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
        title: "Add",
        id: 214,
        position: {
          x: 421,
          y: 123
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
        title: "Add",
        id: 215,
        position: {
          x: 85,
          y: 200
        },
        isSelected: false,
        width: 80,
        inputPorts: [
          { name: "x", type: "int" },
          { name: "y", type: "int" }
        ],
        outputPorts: [{ name: "sum", type: "int" }]
      },
      {
        title: "Add",
        id: 216,
        position: {
          x: 86,
          y: 106
        },
        isSelected: false,
        width: 140,
        inputPorts: [
          { name: "x", type: "int" },
          { name: "y", type: "int" }
        ],
        outputPorts: [{ name: "sum", type: "int" }]
      },
      {
        title: "Add",
        id: 217,
        position: {
          x: 421,
          y: 7
        },
        isSelected: false,
        width: 140,
        inputPorts: [
          { name: "x", type: "int" },
          { name: "y", type: "int" }
        ],
        outputPorts: [{ name: "sum", type: "int" }]
      },
      {
        title: "Add",
        id: 217,
        position: {
          x: 421,
          y: 250
        },
        isSelected: false,
        width: 140,
        inputPorts: [
          { name: "x", type: "int" },
          { name: "y", type: "int" }
        ],
        outputPorts: [{ name: "sum", type: "int" }]
      }
    ],
    connections: [
      {
        isSelected: false,
        from: {
          nodeIndex: 0,
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
          nodeIndex: 3,
          index: 0
        },
        to: {
          nodeIndex: 1,
          index: 0
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
