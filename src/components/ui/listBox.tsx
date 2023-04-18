import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from "react-icons/io";

export interface ListboxSelection {
  name: string;
  value: string;
}

export default function ListboxUI({
  selections,
  defaultSel,
  onSelectValue,
}: {
  selections: ListboxSelection[];
  defaultSel: ListboxSelection;
  onSelectValue: (value: string) => void;
}) {
  const [selected, setSelected] = useState<number>(
    selections.findIndex((s) => s.name === defaultSel.name)
  );

  useEffect(() => {
    setSelected(selections.findIndex((s) => s.name === defaultSel.name));
  }, [defaultSel]);

  return (
    <Listbox
      value={selected}
      onChange={(v) => {
        setSelected(v);
        onSelectValue(selections[v]!.value);
      }}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg py-4 pr-10 pl-3 text-left shadow-md transition-colors hover:bg-primary focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
          <span className="block truncate">{selections[selected]!.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IoIosArrowUp
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute bottom-full mb-1 max-h-60 w-full overflow-auto rounded-md bg-black/20 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur focus:outline-none sm:text-sm">
            {selections.map((selection, i) => (
              <Listbox.Option
                key={i}
                className={({ active }) =>
                  `relative cursor-default select-none py-4 pl-10 pr-4 ${
                    active ? "bg-primary text-accent" : "text-gray-300"
                  }`
                }
                value={i}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}>
                      {selection.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                        <IoIosCheckmark
                          className="h-8 w-8"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
