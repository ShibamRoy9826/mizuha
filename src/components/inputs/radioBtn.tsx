import { useSettings } from '@/contexts/settingsData';
import { motion } from 'motion/react';

interface Props {
    options: string[],
    selected: string,
    setSelected: (a: string) => void,
    moreClasses?: string,
    vertical?: boolean
}

export default function RadioBtn({ options, selected, setSelected, vertical, moreClasses }: Props) {
    const { settings } = useSettings();
    return (
        <div className={"flex items-center justify-center gap-4" + vertical ? "flex-col" : "flex-row"}>
            {
                options.map((option) => (
                    selected === option ?
                        <motion.div
                            whileHover={{ scale: 1.1, backgroundColor: settings.backgroundLighter }}
                            animate={{ backgroundColor: settings.backgroundDarker, scale: 1.2 }}
                            key={option}
                            className={moreClasses + " cursor-pointer button p-2 inline-flex items-center justify-center"} onClick={() => setSelected(option)}>
                            <h1>{option}</h1>
                        </motion.div> :

                        <motion.div
                            whileHover={{ scale: 1.1, backgroundColor: settings.backgroundLighter }}
                            key={option}
                            className={moreClasses + " cursor-pointer button p-2 inline-flex items-center justify-center"} onClick={() => setSelected(option)}>
                            <h1>{option}</h1>
                        </motion.div>
                ))
            }
        </div>
    )
}