import React from "react";
import { shallow } from "enzyme";

import { products } from "../../mockedAPI/products.json";
import { getCart, getProducts, getIsModalOpen } from "../../redux/Selectors";
import Modal from "./Modal";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => mockDispatch,
}));
jest.mock("../../redux/Selectors");
getCart.mockReturnValue([]);
getProducts.mockReturnValue(products);

describe("Test conditional rendering of Modal component", () => {
  it("Should display/find modal if isModalOpen is 'true'", () => {
    const isModalOpen = getIsModalOpen.mockReturnValue(true);
    const wrapper = shallow(<Modal></Modal>);
    expect(wrapper.find("#modal-content").prop("isOpen")).toBe(true);
  });

  it("Should not display/find modal if isModalOpen is 'false'", () => {
    const isModalOpen = getIsModalOpen.mockReturnValue(false);
    const wrapper = shallow(<Modal></Modal>);
    expect(wrapper.find("#modal-content").prop("isOpen")).toBe(false);
  });

  it("Should display modal if isModalOpen is changed from 'false' to 'true", () => {
    const isModalOpen = getIsModalOpen.mockReturnValue(false);

    const handleModal = jest.fn();
    handleModal.mockReturnValueOnce(getIsModalOpen.mockReturnValue(true));

    const wrapper = shallow(<Modal></Modal>);
    expect(wrapper.find("#modal-content").prop("isOpen")).toBe(true);
  });

  it("Should not display modal if isModalOpen is changed from 'true' to 'false", () => {
    const isModalOpen = getIsModalOpen.mockReturnValue(true);

    const handleModal = jest.fn();
    handleModal.mockReturnValueOnce(getIsModalOpen.mockReturnValue(false));

    const wrapper = shallow(<Modal></Modal>);
    expect(wrapper.find("#modal-content").prop("isOpen")).toBe(false);
  });
});

it("Should match snapshot", () => {
  const component = shallow(<Modal></Modal>);
  expect(component).toMatchSnapshot();
});
