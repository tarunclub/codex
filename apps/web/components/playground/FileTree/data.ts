export type TFiles = {
  name: string;
  children?: TFiles[];
};

export const files: TFiles = {
  name: 'root',
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: '.bin',
        },
        {
          name: '.cache',
        },
      ],
    },
    {
      name: 'public',
      children: [
        {
          name: 'index.html',
        },
        {
          name: 'robots.tsx',
        },
      ],
    },
    {
      name: 'src',
      children: [
        {
          name: 'components',
          children: [
            {
              name: 'playground',
              children: [
                {
                  name: 'FileTree',
                  children: [
                    {
                      name: 'FileTree.tsx',
                    },
                    {
                      name: 'data.ts',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
