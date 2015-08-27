<?php

namespace Indholdskanalen\MainBundle\User;

use JMS\Serializer\Annotation as JMS;

class LdapUser extends \IMAG\LdapBundle\User\LdapUser {
  /**
   * @JMS\Groups({"api"})
   * @JMS\VirtualProperty
   * @JMS\SerializedName("id")
   */
  public function getId() {
    return $this->getCn();
  }

  /**
   * @JMS\Groups({"api"})
   * @JMS\VirtualProperty
   * @JMS\SerializedName("fullname")
   */
  public function getFullName() {
    return $this->getDisplayname();
  }

  /**
   * @JMS\Groups({"api"})
   * @JMS\VirtualProperty
   * @JMS\SerializedName("username")
   */
  public function getUser() {
    return $this->getUsername();
  }
}
