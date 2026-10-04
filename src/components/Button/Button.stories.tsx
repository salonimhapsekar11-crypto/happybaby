import type { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { Icon } from '../Icon/Icon';
import docs from '../../docs/docs.module.css';

const variants: ButtonVariant[] = ['attention', 'attention-icon', 'default', 'live', 'ghost', 'link'];
const sizes: ButtonSize[] = ['sm', 'md'];
const states = ['default', 'hover', 'pressed', 'focus', 'disabled'] as const;

/**
 * Argument names match the Figma component properties:
 * `variant`, `size`, `iconLeft` / `iconRight` (Icon left / Icon right + swap), `fullWidth`.
 * The Figma `State` property is handled by CSS (`:hover`, `:active`, `:focus-visible`, `:disabled`).
 * Hover is yellow/500 with a purple/700 label, except the Link variant: no fill, the underlined text turns yellow.
 */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Kostenlos testen', variant: 'default', size: 'md' },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'inline-radio', options: sizes },
    iconLeft: { control: false },
    iconRight: { control: false },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    forceState: { control: 'select', options: [undefined, 'hover', 'pressed', 'focus'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Attention: Story = {
  args: { variant: 'attention' },
  parameters: {
    docs: { description: { story: 'The single primary action in a view (purple/500). Use it once per screen.' } },
  },
};

export const AttentionIcon: Story = {
  args: { variant: 'attention-icon', children: 'Jetzt starten' },
  parameters: {
    docs: {
      description: {
        story:
          'Primary button with the icon in a circle on the right (the "Start now" pattern). Purple/500 pill, purple/700 circle, white arrow. On hover the pill is yellow and the circle turns white. Pass `iconRight` to use another icon.',
      },
    },
  },
};

export const Default: Story = {
  args: { variant: 'default' },
  parameters: { docs: { description: { story: 'Secondary actions (purple/700).' } } },
};

export const Live: Story = {
  args: { variant: 'live', children: 'Aufgewacht' },
  parameters: {
    docs: {
      description: {
        story:
          'Only for a live state, such as a running nap timer or playing audio. The label is purple/700, never white: white on blue is 2.75:1 and fails.',
      },
    },
  },
};

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Link: Story = { args: { variant: 'link', href: '#', children: 'Datenschutz' } };

export const Small: Story = { args: { size: 'sm', variant: 'attention' } };

export const WithIcons: Story = {
  args: {
    variant: 'attention',
    iconLeft: <Icon name="arrow-left" size="md" />,
    iconRight: <Icon name="arrow-left-circle" size="md" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icons are Lucide icons passed as nodes. Use `size="sm"` (20 px) for a Small button and `size="md"` (24 px) for a Medium button.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: { variant: 'attention', fullWidth: true },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 358 }}><Story /></div>],
};

export const Disabled: Story = { args: { disabled: true, variant: 'attention' } };

/** Every variant, size and state next to each other, like the Figma component set. */
export const StateMatrix: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `{(['attention', 'attention-icon', 'default', 'live', 'ghost', 'link'] as const).map((variant) =>
  (['sm', 'md'] as const).map((size) => (
    <Button variant={variant} size={size} forceState="hover">Button</Button>
    // states: forceState="hover" | "pressed" | "focus", or disabled
  ))
)}`,
      },
    },
  },
  render: () => (
    <div className={docs.panel} style={{ overflowX: 'auto' }}>
      <table className={docs.table}>
        <thead>
          <tr>
            <th>Variant</th>
            <th>Size</th>
            {states.map((s) => (
              <th key={s}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.flatMap((variant) =>
            sizes.map((size) => (
              <tr key={`${variant}-${size}`}>
                <td>{variant}</td>
                <td>{size}</td>
                {states.map((state) => (
                  <td key={state}>
                    <Button
                      variant={variant}
                      size={size}
                      disabled={state === 'disabled'}
                      forceState={state === 'disabled' || state === 'default' ? undefined : state}
                    >
                      Button
                    </Button>
                  </td>
                ))}
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  ),
};

export const Playground: Story = {
  args: { variant: 'attention', size: 'md' },
};
