export default function InitialState() {
  return {
    pureHTMLgraph: true,
    scale: 1.0,
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    nodes: [
      {
        title: "2D shape transformation",
        id: 213,
        position: {
          x: 260,
          y: 20
        },
        inputPorts: [
          { name: "in x", type: "int" },
          { name: "in y", type: "int" }
        ],
        outputPorts: [
          { name: "out x", type: "float" },
          { name: "out y", type: "float" }
        ]
      },
      {
        title: "Measurement",
        id: 19,
        position: {
          x: 350,
          y: 120
        },
        inputPorts: [
          { name: "amount", type: "int" },
          { name: "temperature", type: "float" },
          { name: "the grid", type: "se.minerva.Grid" }
        ],
        outputPorts: [
          { name: "result x", type: "float" },
          { name: "result y", type: "float" },
          { name: "result z", type: "float" }
        ]
      },
      {
        title: "Colorizer",
        id: 23,
        position: {
          x: 510,
          y: 236
        },
        inputPorts: [
          { name: "amount", type: "int" },
          { name: "temperature", type: "float" }
        ],
        outputPorts: [
          { name: "red", type: "int" },
          { name: "blue", type: "int" },
          { name: "green", type: "int" },
          { name: "alpha", type: "float" },
          { name: "grid", type: "se.minerva.Grid" }
        ]
      },
      {
        title: "1D transformation",
        id: 101,
        position: {
          x: 95,
          y: 236
        },
        inputPorts: [{ name: "x", type: "float" }],
        outputPorts: [{ name: "x", type: "float" }]
      }
    ],
    connections: [
      {
        from: {
          nodeIndex: 0,
          index: 0
        },
        to: {
          nodeIndex: 1,
          index: 1
        }
      },
      {
        from: {
          nodeIndex: 2,
          index: 4
        },
        to: {
          nodeIndex: 1,
          index: 2
        }
      },
      {
        from: {
          nodeIndex: 3,
          index: 0
        },
        to: {
          nodeIndex: 1,
          index: 1
        }
      }
    ],
    textNode: {
      x: 400,
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
