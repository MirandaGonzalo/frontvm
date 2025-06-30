import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react"
import TabCorporation from "./TabCorporation"
import TabAccounting from "./TabAccounting"
import TabDevices from "./TabDevices"

const ListConfigurations = () => {

  const tabStyles = {
    fontSize: "2xl",
    fontWeight: "600",
    py: "1rem",
    _selected: { 
      color: "orange.500",
      borderBottomColor: "orange.500",
      borderBottomWidth: "3px"
    },
    _hover: {
      color: "orange.400",
    }
  }

  return (
    <Tabs 
      isFitted 
      isLazy 
      onChange={console.log}
      colorScheme="orange"
      variant="line"
      size="lg"
    >
      <TabList 
        borderBottomWidth="2px" 
        borderBottomColor="gray.200"
        mb="1rem"
      >
        <Tab {...tabStyles}>Mi Negocio</Tab>
        <Tab {...tabStyles}>Contabilidad</Tab>
        <Tab {...tabStyles}>Gestión de Dispositivos</Tab>
      </TabList>
      <TabPanels>
        <TabPanel paddingX="0">
          <TabCorporation />
        </TabPanel>
        <TabPanel paddingX="0">
          <TabAccounting />
        </TabPanel>
        <TabPanel paddingX="0">
          <TabDevices />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ListConfigurations